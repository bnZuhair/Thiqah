import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
          <div className="flex max-w-[980px] flex-col items-start gap-2">
            <Badge variant="secondary">Starter Template</Badge>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
              Full-Stack Starter
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground">
              Production-ready project with Next.js, TypeScript, Tailwind CSS,
              and Shadcn UI. Dark mode enabled out of the box.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Get Started</CardTitle>
                <CardDescription>
                  Edit the files inside src/ to build your application.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Submit</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Theme System</CardTitle>
                <CardDescription>
                  Toggle between light, dark, and system themes using the button
                  in the header.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Powered by next-themes with CSS variables for seamless color
                  transitions across your entire application.
                </p>
              </CardContent>
              <CardFooter>
                <Badge>Dark Mode Ready</Badge>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Typography</CardTitle>
                <CardDescription>
                  Dual font support for English and Arabic with Inter and
                  Tajawal.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Fonts are loaded via next/font and exposed as CSS variables
                  for Tailwind integration.
                </p>
              </CardContent>
              <CardFooter>
                <Badge variant="outline">RTL Ready</Badge>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
