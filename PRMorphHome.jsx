import React from 'react';
import 'tailwindcss/tailwind.css';

const Navbar = () => (
    <nav className="flex justify-between p-4 bg-opacity-10 bg-black text-white">
        <div className="text-2xl font-bold">PRMorph</div>
        <div className="flex space-x-4">
            <a href="#hero">Home</a>
            <a href="#ai-lab">AI Lab</a>
            <a href="#features">Features</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#contact">Contact</a>
        </div>
    </nav>
);

const Hero = () => (
    <section className="flex items-center justify-center h-screen bg-black text-white">
        <h1 className="text-5xl font-bold">Transform Your Ideas with PRMorph</h1>
    </section>
);

const AILab = () => (
    <section id="ai-lab" className="p-8 bg-black text-white">
        <h2 className="text-3xl font-bold">AI Lab</h2>
        <div className="flex flex-wrap space-x-4">
            {/* Drag & Drop Upload Area */}
            <div className="flex justify-center items-center w-full h-32 border-dashed border-2 border-gold rounded-lg">
                <p>Drag & Drop your files here</p>
            </div>
            {/* Template Cards */}
            <div className="bg-white text-black rounded-lg p-4 shadow-lg m-4">Template 1</div>
            <div className="bg-white text-black rounded-lg p-4 shadow-lg m-4">Template 2</div>
            <div className="bg-white text-black rounded-lg p-4 shadow-lg m-4">Template 3</div>
        </div>
    </section>
);

const PreviewSection = () => (
    <section className="p-8 bg-black text-white">
        <h2 className="text-3xl font-bold">Before and After</h2>
        <div className="flex">
            <div className="w-1/2 bg-gray-800 p-4 m-2">Before</div>
            <div className="w-1/2 bg-gray-900 p-4 m-2">After</div>
        </div>
    </section>
);

const Features = () => (
    <section id="features" className="p-8 bg-black text-white">
        <h2 className="text-3xl font-bold">Features</h2>
        <div className="flex flex-wrap">
            <div className="bg-white text-black rounded-lg p-4 shadow-lg m-4">Feature 1</div>
            <div className="bg-white text-black rounded-lg p-4 shadow-lg m-4">Feature 2</div>
            <div className="bg-white text-black rounded-lg p-4 shadow-lg m-4">Feature 3</div>
        </div>
    </section>
);

const Testimonials = () => (
    <section id="testimonials" className="p-8 bg-black text-white">
        <h2 className="text-3xl font-bold">Testimonials</h2>
        <div className="p-4">"This service is amazing!" - User</div>
        <div className="p-4">"Highly recommend!" - Another User</div>
    </section>
);

const CTA = () => (
    <section className="p-8 bg-gradient-to-r from-purple-600 to-gold text-black">
        <h2 className="text-3xl font-bold">Join Us Today!</h2>
        <button className="bg-white text-black rounded-lg p-2">Get Started</button>
    </section>
);

const Footer = () => (
    <footer className="p-4 bg-black text-white">
        <p>&copy; 2026 PRMorph. All rights reserved.</p>
    </footer>
);

const PRMorphHome = () => (
    <div>
        <Navbar />
        <Hero />
        <AILab />
        <PreviewSection />
        <Features />
        <Testimonials />
        <CTA />
        <Footer />
    </div>
);

export default PRMorphHome;