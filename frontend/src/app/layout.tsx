import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Brain, Upload, FileText, Users } from "lucide-react";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  const navigationItems = [
    {
      title: "Upload Resume",
      url: createPageUrl("Upload"),
      icon: Upload,
    },
    {
      title: "Dashboard",
      url: createPageUrl("Dashboard"),
      icon: FileText,
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <style>
        {`
          :root {
            --primary-navy: #1e40af;
            --primary-emerald: #10b981;
            --soft-gray: #f8fafc;
            --text-primary: #0f172a;
            --text-secondary: #64748b;
          }
        `}
      </style>

      {/* Navigation Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-slate-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">ResumeAI</h1>
                <p className="text-xs text-slate-500">Intelligent Resume Parser</p>
              </div>
            </div>

            <nav className="hidden md:flex space-x-1">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <Link
                    key={item.title}
                    to={item.url}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-blue-50 text-blue-700 shadow-sm"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="font-medium">{item.title}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-white border-b border-slate-200">
        <div className="flex">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.url;
            return (
              <Link
                key={item.title}
                to={item.url}
                className={`flex-1 flex flex-col items-center py-3 text-xs transition-colors ${
                  isActive
                    ? "text-blue-600 bg-blue-50"
                    : "text-slate-600"
                }`}
              >
                <item.icon className="w-5 h-5 mb-1" />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative">
        {children}
      </main>
    </div>
  );
}