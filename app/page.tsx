import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Users, Zap, Globe, Play, Lock } from "lucide-react";
import { CreateRoomForm } from "@/components/create-room-form";
import { CodeDemo } from "@/components/code-demo";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="p-1 rounded bg-primary">
              <Code className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">CodeCollab</span>
          </Link>
          <nav className="hidden gap-6 items-center md:flex">
            <Link
              href="#features"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              How It Works
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Testimonials
            </Link>
          </nav>
          <div className="flex gap-4 items-center">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="overflow-hidden relative py-20 md:py-32">
          <div className="absolute inset-0 bg-grid-small-black/[0.2] -z-10" />
          <div className="flex absolute inset-0 justify-center items-center -z-10">
            <div className="bg-gradient-to-r rounded-full h-[500px] w-[500px] from-primary/20 to-purple-500/20 blur-3xl" />
          </div>
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 items-center lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col gap-4">
                <div className="inline-flex items-center py-1 px-3 text-sm rounded-lg bg-muted">
                  <span className="py-0.5 px-2 mr-2 text-xs rounded-md bg-primary text-primary-foreground">
                    New
                  </span>
                  <span className="text-muted-foreground">
                    Collaborative coding made simple
                  </span>
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Code Together,{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r to-purple-500 from-primary">
                    In Real-Time
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  Create collaborative coding sessions with audio, video, and
                  text chat. Run code in multiple languages and share your work
                  instantly.
                </p>
                <div className="mt-4">
                  <CreateRoomForm />
                </div>
              </div>
              <div className="relative p-2 mx-auto w-full rounded-xl border shadow-xl max-w-[500px] bg-background">
                <CodeDemo />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Powerful Features for Developers
              </h2>
              <p className="mt-4 text-xl text-muted-foreground">
                Everything you need to collaborate on code in real-time
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center p-6 text-center rounded-xl shadow-sm transition-all hover:shadow-md bg-background">
                <div className="p-3 mb-4 rounded-full bg-primary/10">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Real-time Collaboration</h3>
                <p className="mt-2 text-muted-foreground">
                  Code together with multiple users in real-time with
                  operational transforms for conflict-free editing.
                </p>
              </div>
              <div className="flex flex-col items-center p-6 text-center rounded-xl shadow-sm transition-all hover:shadow-md bg-background">
                <div className="p-3 mb-4 rounded-full bg-primary/10">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Multiple Languages</h3>
                <p className="mt-2 text-muted-foreground">
                  Support for JavaScript, Python, Java, C++, and more with
                  syntax highlighting and intelligent code completion.
                </p>
              </div>
              <div className="flex flex-col items-center p-6 text-center rounded-xl shadow-sm transition-all hover:shadow-md bg-background">
                <div className="p-3 mb-4 rounded-full bg-primary/10">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Audio & Video Chat</h3>
                <p className="mt-2 text-muted-foreground">
                  Connect with teammates via integrated WebRTC audio and video
                  chat for seamless communication.
                </p>
              </div>
              <div className="flex flex-col items-center p-6 text-center rounded-xl shadow-sm transition-all hover:shadow-md bg-background">
                <div className="p-3 mb-4 rounded-full bg-primary/10">
                  <Play className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Code Execution</h3>
                <p className="mt-2 text-muted-foreground">
                  Run your code directly in the browser with secure sandboxed
                  execution environments for all languages.
                </p>
              </div>
              <div className="flex flex-col items-center p-6 text-center rounded-xl shadow-sm transition-all hover:shadow-md bg-background">
                <div className="p-3 mb-4 rounded-full bg-primary/10">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Secure & Private</h3>
                <p className="mt-2 text-muted-foreground">
                  End-to-end encryption for all communications and private rooms
                  with permission controls.
                </p>
              </div>
              <div className="flex flex-col items-center p-6 text-center rounded-xl shadow-sm transition-all hover:shadow-md bg-background">
                <div className="p-3 mb-4 rounded-full bg-primary/10">
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">File Management</h3>
                <p className="mt-2 text-muted-foreground">
                  Organize your code with a built-in file tree and version
                  history tracking.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20">
          <div className="container px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                How It Works
              </h2>
              <p className="mt-4 text-xl text-muted-foreground">
                Get started in three simple steps
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex relative flex-col items-center text-center">
                <div className="flex absolute top-0 left-1/2 justify-center items-center w-10 h-10 text-xl font-bold rounded-full -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground">
                  1
                </div>
                <div className="p-6 pt-10 rounded-xl border shadow-sm bg-background">
                  <h3 className="mb-2 text-xl font-bold">Create a Room</h3>
                  <p className="text-muted-foreground">
                    Set up a new coding session with your preferred permissions
                    and settings.
                  </p>
                </div>
              </div>
              <div className="flex relative flex-col items-center text-center">
                <div className="flex absolute top-0 left-1/2 justify-center items-center w-10 h-10 text-xl font-bold rounded-full -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground">
                  2
                </div>
                <div className="p-6 pt-10 rounded-xl border shadow-sm bg-background">
                  <h3 className="mb-2 text-xl font-bold">
                    Invite Collaborators
                  </h3>
                  <p className="text-muted-foreground">
                    Share your room ID with teammates to start collaborating
                    instantly.
                  </p>
                </div>
              </div>
              <div className="flex relative flex-col items-center text-center">
                <div className="flex absolute top-0 left-1/2 justify-center items-center w-10 h-10 text-xl font-bold rounded-full -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground">
                  3
                </div>
                <div className="p-6 pt-10 rounded-xl border shadow-sm bg-background">
                  <h3 className="mb-2 text-xl font-bold">Code Together</h3>
                  <p className="text-muted-foreground">
                    Write, run, and debug code in real-time with your team using
                    our powerful editor.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-12 text-center">
              <Link href="/create-room">
                <Button size="lg" className="gap-2">
                  Create Your First Room
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                What Developers Say
              </h2>
              <p className="mt-4 text-xl text-muted-foreground">
                Join thousands of developers who love using CodeCollab
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="p-6 rounded-xl border shadow-sm bg-background">
                <div className="flex gap-4 items-center mb-4">
                  <div className="flex justify-center items-center w-12 h-12 rounded-full bg-primary/10">
                    <span className="font-bold text-primary">JD</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Jane Doe</h4>
                    <p className="text-sm text-muted-foreground">
                      Senior Developer @ TechCorp
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "CodeCollab has transformed how our team works on projects.
                  The real-time collaboration features are seamless, and the
                  ability to run code directly in the browser saves us so much
                  time."
                </p>
              </div>
              <div className="p-6 rounded-xl border shadow-sm bg-background">
                <div className="flex gap-4 items-center mb-4">
                  <div className="flex justify-center items-center w-12 h-12 rounded-full bg-primary/10">
                    <span className="font-bold text-primary">MS</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Mike Smith</h4>
                    <p className="text-sm text-muted-foreground">
                      Freelance Developer
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "As a freelancer working with clients around the world,
                  CodeCollab has been a game-changer. I can pair program with
                  clients in real-time, making communication so much clearer."
                </p>
              </div>
              <div className="p-6 rounded-xl border shadow-sm bg-background">
                <div className="flex gap-4 items-center mb-4">
                  <div className="flex justify-center items-center w-12 h-12 rounded-full bg-primary/10">
                    <span className="font-bold text-primary">AJ</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Alex Johnson</h4>
                    <p className="text-sm text-muted-foreground">
                      CS Professor
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "I use CodeCollab in my programming classes to help students
                  collaborate on assignments. The ability to see their code in
                  real-time has made remote teaching much more effective."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="p-8 bg-gradient-to-r to-purple-600 rounded-2xl shadow-xl md:p-12 from-primary">
              <div className="grid gap-8 items-center md:grid-cols-2">
                <div>
                  <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl">
                    Ready to Start Coding Together?
                  </h2>
                  <p className="mt-4 text-lg text-white/90">
                    Join thousands of developers who are already using
                    CodeCollab to build amazing projects together.
                  </p>
                </div>
                <div className="p-6 rounded-xl bg-white/10 backdrop-blur-sm">
                  <h3 className="mb-4 text-xl font-bold text-white">
                    Create a Room Now
                  </h3>
                  <CreateRoomForm variant="dark" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t md:py-16">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center mb-4 space-x-2">
                <div className="p-1 rounded bg-primary">
                  <Code className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold">CodeCollab</span>
              </div>
              <p className="text-muted-foreground">
                Collaborative coding platform for teams, educators, and
                developers worldwide.
              </p>
            </div>
            <div>
              <h3 className="mb-4 font-bold">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#features"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#how-it-works"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-bold">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/docs"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/support"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-bold">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col justify-between items-center pt-8 mt-12 border-t md:flex-row">
            <p className="text-sm text-muted-foreground">
              © 2025 CodeCollab. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Privacy
              </Link>
              <Link
                href="/cookies"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
