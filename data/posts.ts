export type Post = {
  title: string
  excerpt: string
  lyrics: string  // Instead of general content
  song: {
    title: string
    artist: string
    url: string
    coverArt: string  // Instead of a general image
  }
  author: {
    name: string
    avatar: string
  }
  date: string
  readTime: string
  tags: string[]
  slug: string
}

export const posts: Post[] = [
  {
    title: "Talkin' API Blues: A Developer's Lament",
    excerpt: "A tongue-in-cheek musical journey through the trials and tribulations of working with the OpenAI API, from rate limits to token counts.",
    lyrics: `
    Woke up this morning, API key in hand 
    Trying to make my model understand 
    Got my OpenAI package installed with care 
    Setting dangerouslyAllowBrowser 'cause I just don't care 
    (But don't do that in production, no sir)
    
    It's the API Blues, yeah 
    Async calls and waiting 
    It's the API Blues, yeah 
    While my response is generating
    
    Messages array, looking mighty fine 
    System role setting the tone, keeping it in line 
    "You're a helpful assistant," that's what I say 
    User role carries my words, hope they find their way 
    Token count rising, better keep an eye
  
    It's the API Blues, yeah 
    Chat completions creating 
    It's the API Blues, yeah 
    Temperature controls what I'm stating
    
    Max tokens parameter keeps my answers tight 
    Too many tokens and my wallet feels the bite 
    Await that response, handle errors with grace 
    Try-catch blocks save you from disgrace 
    Response comes back, choice zero is where it's at
    
    (Spoken word over blues riff) 
    You see, the thing about these API calls 
    Is you gotta respect the rate limits 
    Keep your keys secure 
    And always check the docs 
    When something ain't working right
    
    It's the API Blues, yeah 
    But my app is finally working 
    It's the API Blues, yeah 
    No more developer smirking 
    It's the API Blues... 
    (And my response is complete)`,
    song: {
      title: "Talkin' API Blues",
      artist: "Dev McKoder",
      url: "/audio/Talkin' API Blues.mp3",
      coverArt: "/assets/API-Blues.webp"
    },
    author: {
      name: "Dev McKoder",
      avatar: "/assets/API-Blues.webp"
    },
    date: "2025-02-20T09:30:00Z",
    readTime: "3 min read",
    tags: ["Tech Humor", "OpenAI", "API Development", "JavaScript", "Developer Life"],
    slug: "talkin-api-blues"
  },
  {
    title: "Vue.js: The Framework Song",
    excerpt: "A catchy tune explaining Vue.js concepts including templates, components, and data binding directives.",
    lyrics: `
  Progressive framework on the rise 
  Single file components, what a surprise 
  Template, Script, and Style in one place 
  Making web development a smoother race
  
  Vue, Vue, Vue dot js 
  Reactive binding made with ease 
  Vue, Vue, Vue dot js
  Building UIs with expertise
  
  Template shows what users will see 
  HTML structure, as simple as can be 
  Script brings logic to the game 
  JavaScript powers, Vue claims its fame
  
  Style your components, make them shine 
  Scoped attributes keep them in line 
  No more CSS bleeding everywhere 
  Component styling with perfect care
  
  Single File Components are the Vue philosophy 
  Encapsulation and modularity 
  Everything together, logical and clean 
  The most elegant framework I've ever seen
  
  V-bind connects your data to the view 
  Colons make it shorter, that's true 
  Binding HTML, keeping it reactive 
  Making your interfaces more attractive
  
  Binding attributes is what we do 
  Sources, links, and buttons too 
  Binding classes for your UI states 
  Active, error, success – it's all great!
  
  Vue, Vue, Vue dot js 
  Reactive binding made with ease 
  Vue, Vue, Vue dot js 
  Building UIs with expertise
  
  From Evan You to you and me 
  Vue makes coding fun, you'll see 
  Progressive, simple, powerful too 
  That's why developers say "I love Vue!"`,
    song: {
      title: "Vue.js: The Framework Song",
      artist: "Sugar Rush",
      url: "/audio/VuejsFrameworkSong.mp3",
      coverArt: "/assets/SugarRush.webp"
    },
    author: {
      name: "Code Harmony",
      avatar: "/assets/SugarRush.webp",
    },
    date: "24-02-2025",
    readTime: "3 min",
    tags: ["Vue.js", "JavaScript", "Web Development", "Frontend", "Programming Music"],
    slug: "vue-js-framework-song"
  },
  {
    title: "Master React Naming Conventions Through Song!",
    excerpt: "Learn the essential React naming conventions through this tune covering everything from PascalCase components to camelCase props, and event handling patterns.",
    lyrics: `
  PascalCase is as simple as can be,
  For components, that's what you'll always see!
  Like BlogCard, Header, and UserProfile too,
  That's the way that React wants you to do!
  
  Pascal, Pascal—that's for components!
  Camel, camel—that's for your props!
  Files match components, that's the golden rule,
  Keep it consistent, don't be a fool!
  
  handleClick, handleChange, handleSubmit too,
  Prefix with "handle"—that's what you should do!
  For prop events, it's onSubmit and onChange,
  Follow these rules, and you'll be in range!
  
  useAuth, useState—hooks start with "use"!
  formatDate in utils, that's what we choose!
  MAX_COUNT constants SHOUT in uppercase,
  And that's the way—uh-huh, uh-huh—
  We like it—uh-huh, uh-huh!
  
  Test files match with a dot test dot tsx,
  CSS Modules? Just add .module.css!
  BlogCard folder holds BlogCard.tsx,
  That's the naming game at its best!
  
  Pascal for components (BlogCard!)
  Camel for your props (userName!)
  Handle for your events (handleClick!)
  Use for all your hooks (useAuth!)
  Now we know the rules,
  Of the React naming school!
  
  Keep it consistent...
  Make it clear...
  That's the React way!`,
    song: {
      title: "The React Naming Convention Song",
      artist: "The TypeScript Troubadours",
      url: "/audio/The React Naming Convention Song (1).mp3",
      coverArt: "/assets/ReactFemaleSinger.jpg"
    },
    author: {
      name: "Cara and the PussyCats",
      avatar: "/assets/ReactFemaleSinger.jpg"
    },
    date: "2025-02-22",
    readTime: "3 min",
    tags: [
      "React",
      "JavaScript",
      "Naming Conventions",
      "Best Practices",
      "Bubblegum-pop"
    ],
    slug: "react-naming-convention-song"
  },
  {
    title: "Next.js Image Magic: The Way to Lightning-Fast Image Optimization",
    excerpt: "A tech-inspired song about Next.js Image optimization and performance improvements in web development",
    lyrics: `
  Images loading slow, weighing down the site
  Layout shifts, pages just don't feel right
  Users leave, waiting too long
  Performance drops, something's wrong
  

  Next.js Image makes it clean
  Optimized with WebP lean
  Lazy loading, auto-size
  Smaller files, speed will rise
  
  Chorus:
  Use <Image>, let it flow
  No extra work, just plug and go
  CDN serves it, keeps it tight
  Faster loads, pages bright!
  
  Resizes files, picks the best,
  No wasted space, outperforms the rest.
  Blur-up previews, looking tight,
  LCP scores shining bright.

  Use <Image>, let it flow,
  No extra work, just plug and go.
  CDN serves it, keeps it tight,
  Faster loads, pages bright!

  Bridge:
  Better scores, no delay
  Google ranks it high today
  Bandwidth low, performance high
  Next.js—just simplify!
  
  Outro:
  From mobile screens to desktop wide
  Every image, optimized
  Next.js, no looking back
  This is how we fade to black`,
    song: {
      title: "Next.js Image Magic",
      artist: "The Performance Optimizers",
      url: "/audio/__Next.js Image Magic_.mp3",
      coverArt: "/assets/next.image1.png"
    },
    author: {
      name: "Alex Chen",
      avatar: "/assets/next.image.jpeg",
    },
    date: "Feb 21, 2025",
    readTime: "4 min",
    tags: ["Next.js", "Performance", "Web Development", "Image Optimization"],
    slug: "nextjs-image-magic-song"
  },
  {
    title: "TypeScript Power: From JavaScript Chaos to Type Safety",
    excerpt: "A musical journey through TypeScript's enhancement of JavaScript, where static typing brings clarity to your code",
    lyrics: `
  JavaScript was running loose, bugs were hard to trace
  Dynamic types, silent fails, breaking every place
  Undefined is not a function—heard it way too much
  Debugging late at midnight, losing every touch
  
  Then I found a stronger way, strict and clear to see
  Static types, intellisense—saving time for me
  No more guessing, no more fear
  Safer code, the path is clear!
  
  Chorus:
  Strongly typed, let it show
  Catching errors as you go!
  Code is clean, the future's bright
  TypeScript keeps it running right!
  
  Types and interfaces, structuring my flow
  Objects locked, no random calls—now I always know
  Enums guide the logic, unions keep it tight
  Autocompletes my function calls, everything's in sight
  
  Bridge:
  Explicit types, strict mode on
  Refactors smooth, my bugs are gone!
  Compile-time checks, no silent breaks
  Saving hours—no mistakes!
  
  Superset of JS, blends right in
  Optional types, just begin
  Slow migration? That's okay
  You can switch it, find your way!
  
  Code is safer, teams aligned
  Docs are clear, don't waste my time
  Strict types mean fewer hacks
  Predictable, no ugly stacks
  
  Outro:
  Typed and tested, future-proof
  Less debugging, that's the truth
  Compile once, errors fight
  TypeScript keeps it running right!`,
    song: {
      title: "Type Power",
      artist: "Jermiyah Wilson",
      url: "/audio/__TypePower.mp3",
      coverArt: "/assets/JermiyahWilson.jpg"
    },
    author: {
      name: "Jermiyah Wilson",
      avatar: "/assets/JermiyahWilson.jpg",
    },
    date: "Mar 10, 2024",
    readTime: "6 min",
    tags: ["TypeScript", "JavaScript", "Type Safety", "Development"],
    slug: "typescript-power-type-safety"
  },
  {
    title: "Docker Groove: The Container Symphony",
    excerpt: "A rhythmic exploration of Docker's containerization magic, from basic commands to deployment mastery",
    lyrics: `
    Docker's here, what does it do?
    Packs your apps inside a crew!
    Lightweight, fast, it runs so neat,
    No more "Works on my machine" defeat!

    Spin up containers, ship with ease,
    No more setups, no more pleas!
    Same on Windows, Mac, or cloud,
    Let's break it down, let's make it loud!

    FROM sets the base, where we start the chase,
    Copy files in place with a simple COPY phrase.
    Need to run a script? Use RUN real quick,
    EXPOSE a port, so the world can click!
    Then we end the ride with a CMD guide,
    Docker's running—watch it shine worldwide!
    Verse 3:
    First, FROM pulls the base we need,
    Ubuntu, Node, or Python speed.
    Then we COPY in the source,
    Code and files—stay on course!

    Now we RUN to install the rest,
    Like npm install, make it the best!
    Then EXPOSE the port, don't forget,
    So outside world can make requests!

    Every step creates a layer,
    Too many? That's a player slayer!
    Squash those RUNs, keep it tight
    Make your images super light!
    [Chorus Repeat]

    Works the same, anywhere you go,
    Cloud, local, all in flow!
    Fast to build and light to run,
    Docker's got it—job well done!

    Scale it up, deploy with ease,
    CI/CD? It's a breeze!
    Microservices, every day,
    Docker helps you pave the way!

    Now you know the Docker game,
    Build, ship, run—it's never the same.
    Keep it simple, keep it lean,
    Docker magic, like a dream!`,
    song: {
      title: "Docker Groove",
      artist: "Ariane Bande",
      url: "/audio/Dockerfile Jam.mp3",
      coverArt: "/assets/DockerSinger.jpg"  // Using placeholder instead
    },
    author: {
      name: "Sarah Johnson",
      avatar: "/assets/DockerSinger.jpg",
    },
    date: "Mar 15, 2024",
    readTime: "5 min",
    tags: ["React", "JavaScript", "Web Development"],
    slug: "react-server-components-digital-flow"
  },
  {
    title: "The TypeScript Type Annotations Song",
    excerpt: "A melodic exploration of TypeScript's type system, from basic annotations to advanced generics, helping developers write safer code through the power of static typing",
    lyrics: `
  type User = { id: string }
  interface Props extends Thing
  Let compiler guide your way
  Generic types display
  Array<string> in your code
  Record<K,V> down the road
  
  Type annotations clear the way
  (user: User) => void they say
  Catch those nulls before runtime
  Type inference so sublime
  
  Union types with pipe in hand
  number | string understand
  Partial<Type> when in doubt
  Readonly<T> helps throughout
  
  function parse<T extends Base>
  Keep those types firmly in place
  That's how TypeScript sets you free
  With strict null checks, you'll see`,
    song: {
      title: "Type Annotations",
      artist: "The Static Typers",
      url: "/audio/The TypeScript Type Annotations Song (3).mp3",
      coverArt: "/assets/TheStaticTypers.jpeg"
    },
    author: {
      name: "Simon TypeScript",
      avatar: "/assets/TheStaticTypers.jpeg",
    },
    date: "Feb 23, 2025",
    readTime: "3 min",
    tags: ["TypeScript", "Programming", "Type Safety", "Development", "Code Poetry"],
    slug: "typescript-type-annotations-song"
  }
]