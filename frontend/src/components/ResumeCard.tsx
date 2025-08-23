// import React from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { format } from "date-fns";
// import { 
//   ExternalLink, 
//   MapPin, 
//   Mail, 
//   Phone,
//   Calendar,
//   Briefcase,
//   Star
// } from "lucide-react";

// export default function ResumeCard({ resume }) {
//   const getInitials = (name) => {
//     if (!name) return "??";
//     return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
//   };

//   return (
//     <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group">
//       <CardContent className="p-6">
//         {/* Header */}
//         <div className="flex items-center space-x-4 mb-4">
//           <Avatar className="w-12 h-12">
//             <AvatarFallback className="bg-gradient-to-tr from-blue-600 to-blue-700 text-white font-semibold">
//               {getInitials(resume.full_name)}
//             </AvatarFallback>
//           </Avatar>
//           <div className="flex-1 min-w-0">
//             <h3 className="font-semibold text-slate-900 truncate">
//               {resume.full_name || "Name not available"}
//             </h3>
//             <p className="text-sm text-slate-500 truncate">{resume.email}</p>
//           </div>
//           {resume.file_url && (
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => window.open(resume.file_url, '_blank')}
//               className="opacity-0 group-hover:opacity-100 transition-opacity"
//             >
//               <ExternalLink className="w-4 h-4" />
//             </Button>
//           )}
//         </div>

//         {/* Contact Info */}
//         <div className="space-y-2 mb-4">
//           {resume.phone && (
//             <div className="flex items-center space-x-2 text-sm text-slate-600">
//               <Phone className="w-4 h-4" />
//               <span className="truncate">{resume.phone}</span>
//             </div>
//           )}
//           {resume.location && (
//             <div className="flex items-center space-x-2 text-sm text-slate-600">
//               <MapPin className="w-4 h-4" />
//               <span className="truncate">{resume.location}</span>
//             </div>
//           )}
//         </div>

//         {/* Experience Summary */}
//         {resume.experience && resume.experience.length > 0 && (
//           <div className="mb-4">
//             <div className="flex items-center space-x-2 text-sm text-slate-600 mb-2">
//               <Briefcase className="w-4 h-4" />
//               <span>Latest Position</span>
//             </div>
//             <p className="font-medium text-slate-900 truncate">
//               {resume.experience[0].title}
//             </p>
//             <p className="text-sm text-blue-600 truncate">
//               {resume.experience[0].company}
//             </p>
//           </div>
//         )}

//         {/* Skills Preview */}
//         {resume.skills && resume.skills.length > 0 && (
//           <div className="mb-4">
//             <div className="flex items-center space-x-2 text-sm text-slate-600 mb-2">
//               <Star className="w-4 h-4" />
//               <span>Top Skills</span>
//             </div>
//             <div className="flex flex-wrap gap-1">
//               {resume.skills.slice(0, 3).map((skill, index) => (
//                 <Badge 
//                   key={index} 
//                   variant="secondary" 
//                   className="text-xs bg-slate-100 text-slate-600"
//                 >
//                   {skill}
//                 </Badge>
//               ))}
//               {resume.skills.length > 3 && (
//                 <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-600">
//                   +{resume.skills.length - 3} more
//                 </Badge>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Footer */}
//         <div className="flex items-center justify-between pt-4 border-t border-slate-100">
//           <div className="flex items-center space-x-2 text-xs text-slate-500">
//             <Calendar className="w-3 h-3" />
//             <span>
//               {format(new Date(resume.created_date), "MMM d, yyyy")}
//             </span>
//           </div>
//           <Badge variant="outline" className="text-xs border-emerald-200 text-emerald-700">
//             Parsed
//           </Badge>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }