'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AnimatedSection } from '@/components/AnimatedSection';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GoogleMap } from '@/components/GoogleMap';
import { ClientOnly } from '@/components/ClientOnly';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  MessageCircle,
  Navigation,
  User,
  Building
} from 'lucide-react';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'pending' | 'sent'>('idle');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Backend email delivery is part of the roadmap (see README).
    // No data is sent — this is a demo project.
    setStatus('pending');
    setTimeout(() => setStatus('sent'), 700);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      subject: value
    }));
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-green-600" />,
      title: "Email Us",
      details: "hello@crop-care.app",
      description: "Send us an email anytime"
    },
    {
      icon: <Phone className="h-6 w-6 text-green-600" />,
      title: "Call Us",
      details: "+91 80000 00000",
      description: "Mon-Fri from 9am to 6pm IST"
    },
    {
      icon: <MapPin className="h-6 w-6 text-green-600" />,
      title: "Visit Us",
      details: "Bengaluru, India",
      description: "Office details available on request"
    },
    {
      icon: <Clock className="h-6 w-6 text-green-600" />,
      title: "Business Hours",
      details: "Mon-Fri: 8am-6pm EST",
      description: "Weekend support available"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about our services? Need help with your agricultural operations? 
            We&apos;re here to help. Contact our team of experts today.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-green-100">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {info.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {info.title}
                  </h3>
                  <p className="text-green-700 font-medium mb-1">
                    {info.details}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {info.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & FAQ */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <Card className="shadow-lg border-green-100">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900 flex items-center">
                    <MessageCircle className="h-6 w-6 text-green-600 mr-2" />
                    Send us a Message
                  </CardTitle>
                  <CardDescription>
                    Fill out the form below and we&apos;ll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-gray-700">First Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input
                            id="firstName"
                            name="firstName"
                            type="text"
                            placeholder="John"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="pl-10 border-green-200 focus:border-green-500 focus:ring-green-500"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-gray-700">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          type="text"
                          placeholder="Farmer"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="border-green-200 focus:border-green-500 focus:ring-green-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@yourfarm.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="pl-10 border-green-200 focus:border-green-500 focus:ring-green-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-700">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          value={formData.phone}
                          onChange={handleChange}
                          className="pl-10 border-green-200 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-gray-700">Farm/Company Name</Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="company"
                          name="company"
                          type="text"
                          placeholder="Green Valley Farm"
                          value={formData.company}
                          onChange={handleChange}
                          className="pl-10 border-green-200 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-gray-700">Subject</Label>
                      <Select onValueChange={handleSelectChange} required>
                        <SelectTrigger className="border-green-200 focus:border-green-500 focus:ring-green-500">
                          <SelectValue placeholder="Select a topic" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="sales">Sales Question</SelectItem>
                          <SelectItem value="support">Technical Support</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="demo">Request a Demo</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-gray-700">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us about your farming needs and how we can help..."
                        value={formData.message}
                        onChange={handleChange}
                        className="min-h-[120px] border-green-200 focus:border-green-500 focus:ring-green-500"
                        required
                      />
                    </div>

                    <Button 
                      type="submit"
                      disabled={status === 'pending' || status === 'sent'}
                      className="w-full bg-green-600 hover:bg-green-700 text-lg py-6 transition-all"
                    >
                      <Send className="h-5 w-5 mr-2" />
                      {status === 'pending' ? 'Sending…' : status === 'sent' ? 'Message received' : 'Send Message'}
                    </Button>

                    {status === 'sent' && (
                      <p className="mt-3 text-sm text-center text-gray-600 bg-green-50 border border-green-100 rounded-md py-2 px-3">
                        Thanks! Backend email delivery is on the roadmap — for now,
                        your message stayed in this browser.
                      </p>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* FAQ Section */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-gray-600">
                  Find quick answers to common questions about our services.
                </p>
              </div>

              <div className="space-y-6">
                <Card className="border-green-100">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      How quickly can I get started with Crop Care?
                    </h3>
                    <p className="text-gray-600">
                      You can start using our basic services immediately after signup. 
                      Hardware installation for advanced monitoring typically takes 1-2 weeks.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-green-100">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      What types of crops do you support?
                    </h3>
                    <p className="text-gray-600">
                      We support all major crop types including grains, vegetables, fruits, 
                      and specialty crops. Our system adapts to different growing conditions and requirements.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-green-100">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Do you offer training and support?
                    </h3>
                    <p className="text-gray-600">
                      Yes! We provide comprehensive onboarding, training sessions, 
                      and ongoing support to ensure you get the most from our platform.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-green-100">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Can I try Crop Care before committing?
                    </h3>
                    <p className="text-gray-600">
                      Absolutely! We offer a 30-day free trial with access to most features. 
                      No credit card required to get started.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-green-100">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      What if I need custom solutions?
                    </h3>
                    <p className="text-gray-600">
                      We offer custom solutions for large operations and unique requirements. 
                      Contact our sales team to discuss your specific needs.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Visit Our Office
            </h2>
            <p className="text-xl text-gray-600">
              Located in the heart of agricultural country
            </p>
          </div>
          
          <div className="h-96 rounded-2xl overflow-hidden shadow-lg">
            <ClientOnly 
              fallback={
                <div className="w-full h-full bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                    <p className="text-green-700 font-medium">Loading map...</p>
                  </div>
                </div>
              }
            >
              <GoogleMap 
                center={{ lat: 12.9716, lng: 77.5946 }} // Bengaluru — placeholder for demo
                zoom={12}
                address="Bengaluru, India"
              />
            </ClientOnly>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              <strong>Location:</strong> Bengaluru, India
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => window.open('https://maps.google.com/?q=Bengaluru', '_blank')}
                className="bg-green-600 hover:bg-green-700"
              >
                <MapPin className="h-4 w-4 mr-2" />
                View on Google Maps
              </Button>
              <Button 
                onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=Bengaluru', '_blank')}
                variant="outline"
                className="border-green-300 text-green-700 hover:bg-green-50"
              >
                <Navigation className="h-4 w-4 mr-2" />
                Get Directions
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}