import React, { useState, useEffect } from "react";
import { Resume } from "@/entities/Resume";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { format } from "date-fns";
import { 
  Search, 
  Plus, 
  ExternalLink, 
  MapPin, 
  Mail, 
  Phone,
  Calendar,
  Briefcase,
  GraduationCap,
  Star
} from "lucide-react";

import StatsCards from "../components/StatsCards";
import ResumeCard from "../components/ResumeCard";

export default function Page() {
  const [resumes, setResumes] = useState([]);
  const [filteredResumes, setFilteredResumes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadResumes();
  }, []);

  useEffect(() => {
    filterResumes();
  }, [searchTerm, resumes]);

  const loadResumes = async () => {
    setIsLoading(true);
    try {
      const data = await Resume.list("-created_date");
      setResumes(data);
    } catch (error) {
      console.error("Error loading resumes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterResumes = () => {
    if (!searchTerm.trim()) {
      setFilteredResumes(resumes);
      return;
    }

    const filtered = resumes.filter(resume => 
      resume.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resume.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resume.skills?.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      resume.experience?.some(exp => 
        exp.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exp.title?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredResumes(filtered);
  };

  const totalSkills = resumes.reduce((acc, resume) => acc + (resume.skills?.length || 0), 0);
  const totalExperience = resumes.reduce((acc, resume) => acc + (resume.experience?.length || 0), 0);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Resume Dashboard</h1>
            <p className="text-slate-600 mt-2">Manage and analyze your parsed resumes</p>
          </div>
          <Link to={createPageUrl("Upload")}>
            <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg">
              <Plus className="w-5 h-5 mr-2" />
              Parse New Resume
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCards
            title="Total Resumes"
            value={resumes.length}
            icon={Briefcase}
            bgColor="from-blue-500 to-blue-600"
          />
          <StatsCards
            title="Total Skills"
            value={totalSkills}
            icon={Star}
            bgColor="from-emerald-500 to-emerald-600"
          />
          <StatsCards
            title="Experience Entries"
            value={totalExperience}
            icon={GraduationCap}
            bgColor="from-purple-500 to-purple-600"
          />
          <StatsCards
            title="This Month"
            value={resumes.filter(r => 
              new Date(r.created_date).getMonth() === new Date().getMonth()
            ).length}
            icon={Calendar}
            bgColor="from-orange-500 to-orange-600"
          />
        </div>

        {/* Search Bar */}
        <Card className="mb-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                placeholder="Search by name, email, skills, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 border-slate-200 focus:border-blue-400 bg-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Resume Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-slate-200 rounded-full" />
                    <div className="space-y-2">
                      <div className="h-4 bg-slate-200 rounded w-32" />
                      <div className="h-3 bg-slate-200 rounded w-24" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-3 bg-slate-200 rounded" />
                    <div className="h-3 bg-slate-200 rounded w-3/4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredResumes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        ) : (
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                {searchTerm ? "No resumes found" : "No resumes yet"}
              </h3>
              <p className="text-slate-600 mb-6">
                {searchTerm 
                  ? "Try adjusting your search terms"
                  : "Upload your first resume to get started"
                }
              </p>
              {!searchTerm && (
                <Link to={createPageUrl("Upload")}>
                  <Button className="bg-gradient-to-r from-blue-600 to-blue-700">
                    <Plus className="w-5 h-5 mr-2" />
                    Parse First Resume
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}