// import React, { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Badge } from "@/components/ui/badge";
// import { Label } from "@/components/ui/label";
// import { 
//   Save, 
//   Edit3, 
//   User, 
//   Mail, 
//   Phone, 
//   MapPin, 
//   Briefcase, 
//   GraduationCap,
//   Star,
//   Loader2,
//   ExternalLink
// } from "lucide-react";

// export default function ResumePreview({ data, onSave, isProcessing }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedData, setEditedData] = useState(data);

//   const handleInputChange = (field, value) => {
//     setEditedData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleArrayChange = (field, index, subField, value) => {
//     setEditedData(prev => ({
//       ...prev,
//       [field]: prev[field]?.map((item, i) => 
//         i === index ? { ...item, [subField]: value } : item
//       )
//     }));
//   };

//   const handleSkillsChange = (value) => {
//     const skills = value.split(',').map(skill => skill.trim()).filter(skill => skill);
//     setEditedData(prev => ({ ...prev, skills }));
//   };

//   const handleSave = () => {
//     onSave(editedData);
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header Card */}
//       <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
//         <CardHeader className="pb-6">
//           <div className="flex justify-between items-start">
//             <div className="flex items-center space-x-4">
//               <div className="w-16 h-16 bg-gradient-to-tr from-slate-600 to-slate-700 rounded-2xl flex items-center justify-center shadow-lg">
//                 <User className="w-8 h-8 text-white" />
//               </div>
//               <div>
//                 {isEditing ? (
//                   <Input
//                     value={editedData.full_name || ""}
//                     onChange={(e) => handleInputChange("full_name", e.target.value)}
//                     className="text-xl font-bold mb-2"
//                     placeholder="Full Name"
//                   />
//                 ) : (
//                   <h2 className="text-2xl font-bold text-slate-900">{data.full_name || "Name not found"}</h2>
//                 )}
//                 <div className="flex items-center space-x-4 text-slate-600 mt-2">
//                   {(editedData.email || isEditing) && (
//                     <div className="flex items-center space-x-2">
//                       <Mail className="w-4 h-4" />
//                       {isEditing ? (
//                         <Input
//                           value={editedData.email || ""}
//                           onChange={(e) => handleInputChange("email", e.target.value)}
//                           placeholder="Email"
//                           className="h-8"
//                         />
//                       ) : (
//                         <span>{editedData.email}</span>
//                       )}
//                     </div>
//                   )}
//                   {(editedData.phone || isEditing) && (
//                     <div className="flex items-center space-x-2">
//                       <Phone className="w-4 h-4" />
//                       {isEditing ? (
//                         <Input
//                           value={editedData.phone || ""}
//                           onChange={(e) => handleInputChange("phone", e.target.value)}
//                           placeholder="Phone"
//                           className="h-8"
//                         />
//                       ) : (
//                         <span>{editedData.phone}</span>
//                       )}
//                     </div>
//                   )}
//                   {(editedData.location || isEditing) && (
//                     <div className="flex items-center space-x-2">
//                       <MapPin className="w-4 h-4" />
//                       {isEditing ? (
//                         <Input
//                           value={editedData.location || ""}
//                           onChange={(e) => handleInputChange("location", e.target.value)}
//                           placeholder="Location"
//                           className="h-8"
//                         />
//                       ) : (
//                         <span>{editedData.location}</span>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//             <div className="flex space-x-2">
//               {data.file_url && (
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => window.open(data.file_url, '_blank')}
//                   className="border-slate-200"
//                 >
//                   <ExternalLink className="w-4 h-4 mr-2" />
//                   View Original
//                 </Button>
//               )}
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => setIsEditing(!isEditing)}
//                 className="border-slate-200"
//               >
//                 <Edit3 className="w-4 h-4 mr-2" />
//                 {isEditing ? "Cancel" : "Edit"}
//               </Button>
//             </div>
//           </div>
//         </CardHeader>

//         {(editedData.summary || isEditing) && (
//           <CardContent className="pt-0">
//             <div className="space-y-2">
//               <Label className="text-sm font-medium text-slate-700">Professional Summary</Label>
//               {isEditing ? (
//                 <Textarea
//                   value={editedData.summary || ""}
//                   onChange={(e) => handleInputChange("summary", e.target.value)}
//                   placeholder="Professional summary..."
//                   className="min-h-[100px]"
//                 />
//               ) : (
//                 <p className="text-slate-600 leading-relaxed">{editedData.summary}</p>
//               )}
//             </div>
//           </CardContent>
//         )}
//       </Card>

//       {/* Experience */}
//       {(editedData.experience?.length > 0 || isEditing) && (
//         <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
//           <CardHeader>
//             <CardTitle className="flex items-center space-x-2">
//               <Briefcase className="w-5 h-5 text-blue-600" />
//               <span>Experience</span>
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-6">
//               {editedData.experience?.map((exp, index) => (
//                 <div key={index} className="border-l-2 border-blue-100 pl-6">
//                   <div className="space-y-2">
//                     {isEditing ? (
//                       <>
//                         <Input
//                           value={exp.title || ""}
//                           onChange={(e) => handleArrayChange("experience", index, "title", e.target.value)}
//                           placeholder="Job Title"
//                           className="font-semibold"
//                         />
//                         <Input
//                           value={exp.company || ""}
//                           onChange={(e) => handleArrayChange("experience", index, "company", e.target.value)}
//                           placeholder="Company"
//                         />
//                         <Input
//                           value={exp.duration || ""}
//                           onChange={(e) => handleArrayChange("experience", index, "duration", e.target.value)}
//                           placeholder="Duration"
//                         />
//                         <Textarea
//                           value={exp.description || ""}
//                           onChange={(e) => handleArrayChange("experience", index, "description", e.target.value)}
//                           placeholder="Description"
//                         />
//                       </>
//                     ) : (
//                       <>
//                         <h4 className="font-semibold text-slate-900">{exp.title}</h4>
//                         <p className="text-blue-600 font-medium">{exp.company}</p>
//                         <p className="text-sm text-slate-500">{exp.duration}</p>
//                         {exp.description && (
//                           <p className="text-slate-600 leading-relaxed">{exp.description}</p>
//                         )}
//                       </>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* Education */}
//       {(editedData.education?.length > 0 || isEditing) && (
//         <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
//           <CardHeader>
//             <CardTitle className="flex items-center space-x-2">
//               <GraduationCap className="w-5 h-5 text-emerald-600" />
//               <span>Education</span>
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {editedData.education?.map((edu, index) => (
//                 <div key={index} className="border-l-2 border-emerald-100 pl-6">
//                   {isEditing ? (
//                     <div className="space-y-2">
//                       <Input
//                         value={edu.degree || ""}
//                         onChange={(e) => handleArrayChange("education", index, "degree", e.target.value)}
//                         placeholder="Degree"
//                       />
//                       <Input
//                         value={edu.school || ""}
//                         onChange={(e) => handleArrayChange("education", index, "school", e.target.value)}
//                         placeholder="School"
//                       />
//                       <Input
//                         value={edu.year || ""}
//                         onChange={(e) => handleArrayChange("education", index, "year", e.target.value)}
//                         placeholder="Year"
//                       />
//                     </div>
//                   ) : (
//                     <>
//                       <h4 className="font-semibold text-slate-900">{edu.degree}</h4>
//                       <p className="text-emerald-600 font-medium">{edu.school}</p>
//                       <p className="text-sm text-slate-500">{edu.year}</p>
//                     </>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* Skills */}
//       {(editedData.skills?.length > 0 || isEditing) && (
//         <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
//           <CardHeader>
//             <CardTitle className="flex items-center space-x-2">
//               <Star className="w-5 h-5 text-purple-600" />
//               <span>Skills</span>
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             {isEditing ? (
//               <Textarea
//                 value={editedData.skills?.join(", ") || ""}
//                 onChange={(e) => handleSkillsChange(e.target.value)}
//                 placeholder="Enter skills separated by commas"
//                 className="min-h-[100px]"
//               />
//             ) : (
//               <div className="flex flex-wrap gap-2">
//                 {editedData.skills?.map((skill, index) => (
//                   <Badge key={index} variant="secondary" className="bg-purple-50 text-purple-700 border-purple-200">
//                     {skill}
//                   </Badge>
//                 ))}
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       )}

//       {/* Save Button */}
//       <div className="flex justify-end">
//         <Button 
//           onClick={handleSave}
//           disabled={isProcessing}
//           className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 px-8 py-3 shadow-lg"
//         >
//           {isProcessing ? (
//             <Loader2 className="w-5 h-5 mr-2 animate-spin" />
//           ) : (
//             <Save className="w-5 h-5 mr-2" />
//           )}
//           {isProcessing ? "Saving..." : "Save Resume"}
//         </Button>
//       </div>
//     </div>
//   );
// }