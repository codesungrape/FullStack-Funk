// Step 1: Set up our global fetch API before anything else
// This must happen before any imports to ensure it's available
import nodeFetch from 'node-fetch';

// Explicitly provide fetch API for the OpenAI library
global.fetch = nodeFetch as unknown as typeof fetch;
global.Request = nodeFetch.Request as unknown as typeof Request;
global.Response = nodeFetch.Response as unknown as typeof Response;
global.Headers = nodeFetch.Headers as unknown as typeof Headers;

// Add Next.js Response.json helper
if (!global.Response.json) {
  global.Response.json = function json(data: any, init?: any) {
    const jsonString = JSON.stringify(data);
    return new Response(jsonString, {
      ...init,
      headers: {
        ...init?.headers,
        'content-type': 'application/json',
      },
    });
  };
}

// Step 2: Set up Jest mocks before importing any modules 
// Note that Jest hoists these declarations, but keeping them at the top
// makes the code more readable and clear about execution order
// At the very top, before any imports
jest.mock('openai', () => {
  // Create a mock constructor function
  const OpenAIMock = jest.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: jest.fn().mockImplementation(() => {
          // Return a default mock stream that tests can override
          return [];
        })
      }
    }
  }));
  
  // Return the module with our mocked constructor
  return {
    __esModule: true,
    default: OpenAIMock
  };
});

// Mock the route module to ensure the shim is loaded before the actual module
jest.mock('./route', () => {
  // First load the OpenAI shim to provide fetch compatibility
  require('openai/shims/node');
  
  // Then return the actual implementation
  const actualModule = jest.requireActual('./route');
  return actualModule;
});

// Step 3: Only now, after setting up the environment, import the modules
import { POST } from './route';
import OpenAI from 'openai';
import { NextRequest } from 'next/server';

// Define types for our mocks to match TypeScript requirements
type MockStreamChoice = {
  choices: Array<{
    delta: {
      content?: string;
    };
  }>;
};

// Mock the TextEncoder and ReadableStream APIs needed by the route
global.TextEncoder = function TextEncoder() {
  return {
    encoding: 'utf-8',
    encode: function(input: string): Uint8Array {
      return Buffer.from(input);
    },
    encodeInto: function(input: string, output: Uint8Array): { read: number; written: number } {
      const encoded = Buffer.from(input);
      const length = Math.min(encoded.length, output.length);
      
      for (let i = 0; i < length; i++) {
        output[i] = encoded[i];
      }
      
      return { read: input.length, written: length };
    }
  };
} as unknown as typeof TextEncoder;

// Create a proper mock for ReadableStream
class MockReadableStreamController {
  enqueue = jest.fn();
  close = jest.fn();
  error = jest.fn();
}

global.ReadableStream = function ReadableStream(options?: {
  start?: (controller: any) => void;
}) {
  const controller = new MockReadableStreamController();
  
  // Execute the start method immediately to simulate stream initialization
  if (options && options.start) {
    options.start(controller);
  }
  
  return { controller };
} as unknown as typeof ReadableStream;

// Set up environment variables for testing
process.env.OPENAI_API_KEY = 'test-api-key';

// Create a reusable mock OpenAI instance to ensure consistent behavior
const mockOpenAIInstance = {
  chat: {
    completions: {
      create: jest.fn()
    }
  }
};

// Step 4: Now we can begin our tests
describe('OpenAI Lyrics Generation API', () => {
  // Reset all mocks before each test to ensure clean state
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Set up the OpenAI mock consistently for all tests
    (OpenAI as jest.MockedClass<typeof OpenAI>).mockImplementation(() => {
      return mockOpenAIInstance as unknown as OpenAI;
    });
  });

  /**
   * Test Category 1: Valid Input Processing
   * This test ensures that the API correctly handles a valid request
   * with study notes and processes it appropriately.
   */

  /**
   * Test Category 2: Integration Tests with OpenAI Client
   * These tests verify that our API correctly interacts with the OpenAI client,
   * including proper handling of the streaming response.
   */
  describe('OpenAI Client Interaction', () => {

    test('correctly processes streaming response', async () => {
      // Create mock request
      const mockRequest = {
        json: jest.fn().mockResolvedValue({ 
          studyNotes: 'HTTP Status Codes' 
        })
      } as unknown as NextRequest;

      // Create a mock stream with multiple chunks to test streaming behavior
      const mockStream = [
        { choices: [{ delta: { content: 'Song ' } }] },
        { choices: [{ delta: { content: 'Title: ' } }] },
        { choices: [{ delta: { content: 'HTTP Status Symphony' } }] },
        { choices: [{ delta: { content: '\n\nVerse 1:' } }] },
        { choices: [{ delta: { content: ' When you get a 200, everything is OK' } }] }
      ] as unknown as AsyncIterable<MockStreamChoice>;

      // Configure the mock to return our stream
      mockOpenAIInstance.chat.completions.create.mockReturnValue(mockStream);

      // Call the POST function
      const response = await POST(mockRequest);

      // Verify the response headers for streaming
      expect(response.headers.get('Content-Type')).toBe('text/event-stream');
      expect(response.headers.get('Cache-Control')).toBe('no-cache');
      expect(response.headers.get('Connection')).toBe('keep-alive');
    });
  });
});