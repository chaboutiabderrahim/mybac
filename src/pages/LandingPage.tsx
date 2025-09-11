import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  BookOpen,
  Star,
  Trophy,
  Users,
  GraduationCap,
  ArrowRight,
  Play,
  CheckCircle,
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Menu,
  Facebook,
  Twitter,
  Instagram,
  Youtube
} from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border/50 z-50 animate-fade-in">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 animate-slide-up">
              <img 
                src="/lovable-uploads/2473f7f5-d49d-4abd-8426-94b1d4b3646e.png" 
                alt="THE SMART Logo" 
                className="h-12 w-12 object-contain animate-bounce-subtle"
              />
              <span className="text-xl font-bold text-foreground">THE SMART</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('about')}
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105 story-link"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105 story-link"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105 story-link"
              >
                Contact
              </button>
              <Link to="/login">
                <Button className="gradient-primary text-white hover:scale-105 transition-all duration-300 shadow-glow">
                  Login
                </Button>
              </Link>
            </nav>
            <Button variant="ghost" className="md:hidden hover:scale-105 transition-transform">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 animate-pulse"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-up">
              <div className="space-y-4">
                <Badge className="bg-primary/20 text-primary border-primary/30 animate-fade-in">
                  🎓 AI-Powered Learning
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight animate-fade-in">
                  Master Your Learning with THE SMART AI Platform
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed animate-fade-in" style={{animationDelay: '0.2s'}}>
                  Transform your learning experience with personalized AI tutoring, practice exams, and expert guidance. Join thousands of successful students.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
                <Link to="/home">
                  <Button size="lg" className="gradient-primary text-white px-8 py-6 text-lg font-semibold shadow-glow hover:scale-105 transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative flex items-center">
                      Start Learning Now
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="px-8 py-6 text-lg hover:scale-105 transition-all duration-300 border-primary/20 hover:border-primary hover:bg-primary/5">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>
            </div>
            <div className="relative animate-fade-in" style={{animationDelay: '0.6s'}}>
              <div className="relative z-10 flex items-center justify-center">
                <div className="w-80 h-80 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10 relative overflow-hidden group hover:scale-105 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <GraduationCap className="h-32 w-32 text-primary animate-bounce-subtle" />
                </div>
              </div>
              <div className="absolute top-1/2 right-0 transform translate-x-1/4 -translate-y-1/2 animate-bounce-subtle" style={{animationDelay: '0.8s'}}>
                <Card className="bg-purple-500/20 border-purple-500/30 backdrop-blur-sm hover:scale-110 transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-yellow-400 animate-pulse" />
                      <span className="text-sm font-medium text-white">98% Success Rate</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="absolute bottom-10 left-0 transform -translate-x-1/4 animate-bounce-subtle" style={{animationDelay: '1s'}}>
                <Card className="bg-green-500/20 border-green-500/30 backdrop-blur-sm hover:scale-110 transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-400 animate-pulse" />
                      <span className="text-sm font-medium text-white">4.9/5 Rating</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              About THE SMART
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We are dedicated to revolutionizing education through cutting-edge AI technology and personalized learning experiences.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:scale-105 transition-all duration-300 border-primary/10 animate-fade-in">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
                <p className="text-muted-foreground">Experienced educators and AI specialists working together</p>
              </CardContent>
            </Card>
            <Card className="hover:scale-105 transition-all duration-300 border-primary/10 animate-fade-in" style={{animationDelay: '0.2s'}}>
              <CardContent className="p-6 text-center">
                <GraduationCap className="h-12 w-12 text-secondary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Proven Results</h3>
                <p className="text-muted-foreground">Over 10,000 students have achieved their goals with us</p>
              </CardContent>
            </Card>
            <Card className="hover:scale-105 transition-all duration-300 border-primary/10 animate-fade-in" style={{animationDelay: '0.4s'}}>
              <CardContent className="p-6 text-center">
                <Sparkles className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">AI Innovation</h3>
                <p className="text-muted-foreground">Latest AI technology for personalized learning paths</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Powerful Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Everything you need to succeed in your examinations, powered by advanced AI technology.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: "AI Tutoring", desc: "24/7 personalized AI assistance" },
              { icon: Trophy, title: "Practice Exams", desc: "Real exams with detailed solutions" },
              { icon: Users, title: "Alumni Mentoring", desc: "Connect with successful graduates" },
              { icon: Star, title: "Progress Tracking", desc: "Monitor your learning journey" },
              { icon: CheckCircle, title: "Video Lessons", desc: "Comprehensive video library" },
              { icon: Sparkles, title: "Smart Recommendations", desc: "AI-powered study suggestions" }
            ].map((feature, index) => (
              <Card key={index} className="hover:scale-105 transition-all duration-300 border-primary/10 animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <CardContent className="p-6 text-center">
                  <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Have questions? We're here to help you succeed in your learning journey.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8 animate-fade-in">
              <div className="flex items-center gap-4">
                <Mail className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-muted-foreground">support@thesmart.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-muted-foreground">+213 XXX XXX XXX</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-muted-foreground">Algiers, Algeria</p>
                </div>
              </div>
            </div>
            <form className="space-y-4 animate-fade-in" style={{animationDelay: '0.2s'}}>
              <Input placeholder="Your Name" className="hover-scale" />
              <Input placeholder="Your Email" type="email" className="hover-scale" />
              <Textarea placeholder="Your Message" rows={4} className="hover-scale" />
              <Button className="w-full gradient-primary text-white hover:scale-105 transition-all duration-300">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <img 
                  src="/lovable-uploads/2473f7f5-d49d-4abd-8426-94b1d4b3646e.png" 
                  alt="THE SMART Logo" 
                  className="h-10 w-10 object-contain"
                />
                <span className="font-bold">THE SMART</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Empowering students to excel in their examinations through AI-powered learning.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <button onClick={() => scrollToSection('about')} className="block text-muted-foreground hover:text-primary story-link">About</button>
                <button onClick={() => scrollToSection('features')} className="block text-muted-foreground hover:text-primary story-link">Features</button>
                <button onClick={() => scrollToSection('contact')} className="block text-muted-foreground hover:text-primary story-link">Contact</button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <div className="space-y-2 text-sm">
                <Link to="/login" className="block text-muted-foreground hover:text-primary story-link">Login</Link>
                <Link to="/home" className="block text-muted-foreground hover:text-primary story-link">Dashboard</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer hover-scale" />
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer hover-scale" />
                <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer hover-scale" />
                <Youtube className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer hover-scale" />
              </div>
            </div>
          </div>
          <div className="border-t border-border/50 mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 THE SMART. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;