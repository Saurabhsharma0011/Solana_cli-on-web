import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | NEX4',
  description: 'Privacy Policy for NEX4 platform',
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <div className="prose max-w-none">
        <p>Last updated: January 2023</p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">Introduction</h2>
        <p>
          Welcome to NEX4's Privacy Policy. This document explains how we collect, use, and protect your personal information.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">Information We Collect</h2>
        <p>
          We may collect information that you provide directly to us, such as when you create an account, use our services, or communicate with us.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">How We Use Your Information</h2>
        <p>
          We use the information we collect to provide, maintain, and improve our services, and to develop new ones.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">Information Sharing</h2>
        <p>
          We do not share your personal information with companies, organizations, or individuals outside of NEX4 except in the following cases:
        </p>
        <ul className="list-disc pl-6 my-4">
          <li>With your consent</li>
          <li>For legal reasons</li>
          <li>To protect NEX4</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">Security</h2>
        <p>
          We work hard to protect our users from unauthorized access to or unauthorized alteration, disclosure, or destruction of information we hold.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">Changes</h2>
        <p>
          Our Privacy Policy may change from time to time. We will post any privacy policy changes on this page.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">Contact Us</h2>
        <p>
          If you have any questions about our Privacy Policy, please contact us at privacy@nex4.dev.
        </p>
      </div>
    </div>
  );
}
