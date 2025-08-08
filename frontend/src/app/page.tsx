"use client";

import { useState } from "react";
import { 
  Send, 
  Bot, 
  User, 
  Loader2, 
  Scale, 
  BookOpen, 
  Shield, 
  Zap, 
  FileText, 
  Building2, 
  Gavel,
  ArrowRight,
  CheckCircle,
  Star,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Lightbulb,
  Cpu,
  GraduationCap,
  Users,
  Calendar,
  MessageSquare,
  Award,
  Clock,
  Target,
  TrendingUp,
  Briefcase,
  Heart,
  Eye,
  Check,
  ChevronRight,
  Play,
  Quote
} from "lucide-react";
import { 
  FaGavel, 
  FaBalanceScale, 
  FaShieldAlt, 
  FaRocket,
  FaUserTie,
  FaHandshake,
  FaAward,
  FaClock,
  FaStar,
  FaCheckCircle,
  FaArrowRight,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt
} from "react-icons/fa";
import { askLegalQuestion } from "@/lib/api";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm VerdictAI, your legal assistant. I can help you with legal questions using my knowledge of legal texts and regulations. What would you like to know?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const data = await askLegalQuestion(input.trim());
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.answer,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm having trouble connecting to my legal database right now. Please try again in a moment.",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (showChat) {
    return (
      <div className="flex flex-col h-screen bg-gradient-to-br from-[#013220] to-[#0D5131]">
        {/* Header */}
        <header className="bg-[#0D5131] border-b border-[#467E6C] shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <FaGavel className="text-2xl text-[#B2904C]" />
                <h1 className="text-xl font-bold text-[#F1F1F1]">
                  VerdictAI
                </h1>
              </div>
              <div className="flex items-center gap-1 text-sm text-[#F1F1F1]/70">
                <BookOpen className="w-4 h-4" />
                <span>Legal Assistant</span>
              </div>
            </div>
            <button
              onClick={() => setShowChat(false)}
              className="text-[#F1F1F1]/80 hover:text-[#F1F1F1]"
            >
              ← Back to Home
            </button>
          </div>
        </header>

        {/* Chat Container */}
        <div className="flex-1 overflow-hidden">
          <div className="max-w-4xl mx-auto h-full flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex gap-3 max-w-[80%] ${
                      message.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        message.role === "user"
                          ? "bg-[#1E5A47] text-[#F1F1F1]"
                          : "bg-[#467E6C] text-[#F1F1F1]"
                      }`}
                    >
                      {message.role === "user" ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4" />
                      )}
                    </div>
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.role === "user"
                          ? "bg-[#1E5A47] text-[#F1F1F1]"
                          : "bg-[#0D5131] border border-[#467E6C]"
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </p>
                      <p
                        className={`text-xs mt-2 ${
                          message.role === "user"
                            ? "text-[#F1F1F1]/70"
                            : "text-[#F1F1F1]/60"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Loading indicator */}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#467E6C] flex items-center justify-center">
                    <Bot className="w-4 h-4 text-[#F1F1F1]" />
                  </div>
                  <div className="bg-[#0D5131] border border-[#467E6C] rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-[#B2904C]" />
                      <span className="text-sm text-[#F1F1F1]/80">
                        Analyzing legal documents...
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <div className="border-t border-[#467E6C] bg-[#0D5131] p-4">
              <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask me about legal matters, regulations, or case law..."
                      className="w-full px-4 py-3 pr-12 rounded-2xl border border-[#467E6C] bg-[#013220] text-[#F1F1F1] placeholder-[#F1F1F1]/50 focus:outline-none focus:ring-2 focus:ring-[#B2904C] focus:border-transparent"
                      disabled={isLoading}
                    />
                    <button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-xl bg-[#1E5A47] text-[#F1F1F1] hover:bg-[#467E6C] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#013220] via-[#0D5131] to-[#013220]">
      {/* Navigation */}
      <nav className="bg-[#0D5131]/95 backdrop-blur-md border-b border-[#467E6C] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <FaGavel className="text-3xl text-[#B2904C]" />
              <div>
                <h1 className="text-2xl font-bold text-[#F1F1F1]">VerdictAI</h1>
                <p className="text-xs text-[#B2904C]">advocate & law firm</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-8 text-[#F1F1F1]/80">
              <a href="#services" className="hover:text-[#B2904C] transition-colors">Services</a>
              <a href="#about" className="hover:text-[#B2904C] transition-colors">About</a>
              <a href="#team" className="hover:text-[#B2904C] transition-colors">Team</a>
              <a href="#contact" className="hover:text-[#B2904C] transition-colors">Contact</a>
            </div>
            <button
              onClick={() => setShowChat(true)}
              className="bg-[#1E5A47] text-[#F1F1F1] px-6 py-2 rounded-lg font-semibold hover:bg-[#467E6C] transition-colors"
            >
              Start Chat
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl font-bold text-[#F1F1F1] mb-6 leading-tight">
                A Special Approach to{" "}
                <span className="text-[#B2904C]">Each Case</span>
              </h1>
              <p className="text-xl md:text-2xl text-[#F1F1F1]/80 mb-8 max-w-2xl">
                Our AI-powered legal assistant provides customer-centric advice to corporations and individuals, backed by comprehensive legal knowledge.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => setShowChat(true)}
                  className="bg-[#1E5A47] text-[#F1F1F1] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#467E6C] transition-colors flex items-center justify-center gap-2"
                >
                  Ask Legal Question
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="border-2 border-[#B2904C] text-[#B2904C] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#B2904C] hover:text-[#013220] transition-colors flex items-center justify-center gap-2">
                  <Play className="w-5 h-5" />
                  Watch Demo
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-[#0D5131] to-[#1E5A47] rounded-2xl p-8 shadow-2xl">
                <div className="text-center">
                  <FaGavel className="text-6xl text-[#B2904C] mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-[#F1F1F1] mb-4">AI-Powered Legal Solutions</h3>
                  <p className="text-[#F1F1F1]/80 mb-6">Get instant legal guidance from our comprehensive database</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-[#F1F1F1]/70">
                      <CheckCircle className="w-4 h-4 text-[#B2904C]" />
                      <span>24/7 Available</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#F1F1F1]/70">
                      <CheckCircle className="w-4 h-4 text-[#B2904C]" />
                      <span>Expert Reviewed</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#F1F1F1]/70">
                      <CheckCircle className="w-4 h-4 text-[#B2904C]" />
                      <span>Instant Answers</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#F1F1F1]/70">
                      <CheckCircle className="w-4 h-4 text-[#B2904C]" />
                      <span>Secure & Private</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-[#013220]/50 to-[#0D5131]/50"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-20 left-20 w-32 h-32 border border-[#B2904C]/30 rounded-full"></div>
            <div className="absolute top-40 right-20 w-24 h-24 border border-[#B2904C]/20 rounded-full"></div>
            <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-[#B2904C]/25 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D5131]/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#F1F1F1] mb-4">Our Popular Services</h2>
            <p className="text-xl text-[#F1F1F1]/80">Comprehensive legal solutions for every need</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Contract Law", icon: FileText, description: "Drafting, reviewing, and negotiating contracts" },
              { name: "Property Law", icon: Building2, description: "Real estate transactions and property disputes" },
              { name: "Criminal Law", icon: Gavel, description: "Criminal defense and legal representation" },
              { name: "Business Law", icon: Briefcase, description: "Corporate legal services and compliance" },
              { name: "Family Law", icon: Heart, description: "Divorce, custody, and family matters" },
              { name: "Civil Litigation", icon: Scale, description: "Dispute resolution and court representation" }
            ].map((service, index) => (
              <div key={index} className="bg-[#0D5131]/80 backdrop-blur-sm border border-[#467E6C] rounded-xl p-6 hover:bg-[#0D5131] transition-all duration-300 hover:shadow-xl hover:shadow-[#B2904C]/10">
                <div className="w-16 h-16 bg-[#1E5A47] rounded-xl flex items-center justify-center mb-4">
                  <service.icon className="text-2xl text-[#F1F1F1]" />
                </div>
                <h3 className="text-xl font-semibold text-[#F1F1F1] mb-2">{service.name}</h3>
                <p className="text-[#F1F1F1]/70 mb-4">{service.description}</p>
                <button className="text-[#B2904C] hover:text-[#F1F1F1] transition-colors flex items-center gap-2">
                  Learn More <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="bg-gradient-to-br from-[#0D5131] to-[#1E5A47] rounded-2xl p-8 shadow-2xl">
                <div className="text-center">
                  <FaUserTie className="text-6xl text-[#B2904C] mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-[#F1F1F1] mb-4">Our Lawyers Provide Customer Centric Advice</h3>
                  <p className="text-[#F1F1F1]/80 mb-6">
                    Attorneys are trained to analyze legal issues and draft legal documents. Our AI-powered system combines this expertise with cutting-edge technology.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-[#F1F1F1]/70">
                      <CheckCircle className="w-4 h-4 text-[#B2904C]" />
                      <span>Specific Advice</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#F1F1F1]/70">
                      <CheckCircle className="w-4 h-4 text-[#B2904C]" />
                      <span>Business Security</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#F1F1F1]/70">
                      <CheckCircle className="w-4 h-4 text-[#B2904C]" />
                      <span>Property Law</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#F1F1F1]/70">
                      <CheckCircle className="w-4 h-4 text-[#B2904C]" />
                      <span>Shop & Office</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-[#F1F1F1] mb-6">Trusted Legal Advisor</h2>
              <p className="text-xl text-[#F1F1F1]/80 mb-8">
                Our AI-powered legal assistant provides comprehensive legal guidance backed by extensive knowledge of laws, regulations, and case precedents.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#B2904C] mb-2">18+</div>
                  <div className="text-[#F1F1F1]/70">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#B2904C] mb-2">265+</div>
                  <div className="text-[#F1F1F1]/70">Cases Handled</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#B2904C] mb-2">24/7</div>
                  <div className="text-[#F1F1F1]/70">Availability</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#B2904C] mb-2">99%</div>
                  <div className="text-[#F1F1F1]/70">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Statistics Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-[#0D5131]/80 backdrop-blur-sm border border-[#467E6C] rounded-xl">
              <div className="w-16 h-16 bg-[#1E5A47] rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="text-2xl text-[#F1F1F1]" />
              </div>
              <div className="text-3xl font-bold text-[#B2904C] mb-2">81%</div>
              <h3 className="text-xl font-semibold text-[#F1F1F1] mb-2">Legal Methods</h3>
              <p className="text-[#F1F1F1]/70">Advanced legal analysis techniques</p>
            </div>
            <div className="text-center p-8 bg-[#0D5131]/80 backdrop-blur-sm border border-[#467E6C] rounded-xl">
              <div className="w-16 h-16 bg-[#1E5A47] rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-2xl text-[#F1F1F1]" />
              </div>
              <div className="text-3xl font-bold text-[#B2904C] mb-2">68%</div>
              <h3 className="text-xl font-semibold text-[#F1F1F1] mb-2">Remote Advice</h3>
              <p className="text-[#F1F1F1]/70">Digital legal consultation services</p>
            </div>
            <div className="text-center p-8 bg-[#0D5131]/80 backdrop-blur-sm border border-[#467E6C] rounded-xl">
              <div className="w-16 h-16 bg-[#1E5A47] rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-2xl text-[#F1F1F1]" />
              </div>
              <div className="text-3xl font-bold text-[#B2904C] mb-2">79%</div>
              <h3 className="text-xl font-semibold text-[#F1F1F1] mb-2">Strong Cases</h3>
              <p className="text-[#F1F1F1]/70">Robust legal case preparation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0D5131]/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#F1F1F1] mb-4">Appointment Event</h2>
            <p className="text-xl text-[#F1F1F1]/80">Get personalized legal assistance</p>
          </div>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#F1F1F1] mb-2 font-semibold">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-[#013220]/80 border border-[#467E6C] text-[#F1F1F1] placeholder-[#F1F1F1]/50 focus:outline-none focus:ring-2 focus:ring-[#B2904C]"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-[#F1F1F1] mb-2 font-semibold">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg bg-[#013220]/80 border border-[#467E6C] text-[#F1F1F1] placeholder-[#F1F1F1]/50 focus:outline-none focus:ring-2 focus:ring-[#B2904C]"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-[#F1F1F1] mb-2 font-semibold">Phone</label>
              <input
                type="tel"
                className="w-full px-4 py-3 rounded-lg bg-[#013220]/80 border border-[#467E6C] text-[#F1F1F1] placeholder-[#F1F1F1]/50 focus:outline-none focus:ring-2 focus:ring-[#B2904C]"
                placeholder="Your phone number"
              />
            </div>
            <div>
              <label className="block text-[#F1F1F1] mb-2 font-semibold">Message</label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-[#013220]/80 border border-[#467E6C] text-[#F1F1F1] placeholder-[#F1F1F1]/50 focus:outline-none focus:ring-2 focus:ring-[#B2904C]"
                placeholder="Describe your legal matter..."
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-[#1E5A47] text-[#F1F1F1] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#467E6C] transition-colors"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#F1F1F1] mb-4">What Our Clients Say</h2>
            <p className="text-xl text-[#F1F1F1]/80">Trusted by businesses and individuals</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-xl bg-[#0D5131]/80 backdrop-blur-sm border border-[#467E6C]">
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#B2904C] fill-current" />
                ))}
              </div>
              <Quote className="w-8 h-8 text-[#B2904C] mb-4" />
              <p className="text-[#F1F1F1]/80 mb-6 text-lg">"VerdictAI provided me with clear, actionable legal guidance that saved me thousands in potential legal fees. The AI's knowledge is impressive and the responses are always professional."</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#1E5A47] rounded-full"></div>
                <div>
                  <p className="text-[#F1F1F1] font-semibold">Sarah M.</p>
                  <p className="text-[#F1F1F1]/60 text-sm">Business Owner</p>
                </div>
              </div>
            </div>
            <div className="p-8 rounded-xl bg-[#0D5131]/80 backdrop-blur-sm border border-[#467E6C]">
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#B2904C] fill-current" />
                ))}
              </div>
              <Quote className="w-8 h-8 text-[#B2904C] mb-4" />
              <p className="text-[#F1F1F1]/80 mb-6 text-lg">"The best legal tool I've used. Fast, accurate, and affordable. The AI understands complex legal questions and provides practical solutions."</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#1E5A47] rounded-full"></div>
                <div>
                  <p className="text-[#F1F1F1] font-semibold">Ahmed K.</p>
                  <p className="text-[#F1F1F1]/60 text-sm">Legal Consultant</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-[#013220] border-t border-[#467E6C] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <FaGavel className="text-2xl text-[#B2904C]" />
                <div>
                  <h3 className="text-xl font-bold text-[#F1F1F1]">VerdictAI</h3>
                  <p className="text-xs text-[#B2904C]">advocate & law firm</p>
                </div>
              </div>
              <p className="text-[#F1F1F1]/70">AI-powered legal assistance for everyone.</p>
            </div>
            <div>
              <h4 className="text-[#F1F1F1] font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-[#F1F1F1]/70">
                <li><a href="#" className="hover:text-[#B2904C] transition-colors">Contract Law</a></li>
                <li><a href="#" className="hover:text-[#B2904C] transition-colors">Property Law</a></li>
                <li><a href="#" className="hover:text-[#B2904C] transition-colors">Criminal Law</a></li>
                <li><a href="#" className="hover:text-[#B2904C] transition-colors">Business Law</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#F1F1F1] font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-[#F1F1F1]/70">
                <li><a href="#" className="hover:text-[#B2904C] transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-[#B2904C] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#B2904C] transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-[#B2904C] transition-colors">Disclaimer</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#F1F1F1] font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-[#F1F1F1]/70">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:contact@verdictai.com" className="hover:text-[#B2904C] transition-colors">contact@verdictai.com</a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <a href="tel:+880123456789" className="hover:text-[#B2904C] transition-colors">+880 123 456 789</a>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Dhaka, Bangladesh</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#467E6C] mt-8 pt-8 text-center text-[#F1F1F1]/70">
            <p>&copy; 2024 VerdictAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
