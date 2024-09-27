import React, { useState, useEffect } from 'react';
import { supabase } from "@/lib/sbClient";

interface Project {
  name: string;
  image: string;
}

const images = {
  img1: '/fact.jpg',
  img2: '/fact1.jpg',
  img3: '/fact2.jpg',
  img4: '/fact3.jpg',
  img5: '/fact4.jpg',
  img6: '/fact5.jpg',
  img7: '/fact6.jpg',
  img8: '/fact7.jpg',
}

const descriptions = {
  desc1: 'Omvandlar plastavfall till återanvändbara byggmaterial för bostäder med låga inkomster.',
  desc2: 'Ett samhällsdrivet initiativ för att återvinna elektronik och återanvända komponenter.',
  desc3: 'Gör matavfall till kompost för stadsnära jordbruk.',
  desc4: 'Återanvänder gamla däck för att bygga miljövänliga lekplatser.',
  desc5: 'Samlar in och återvinner textilier för att skapa hållbara kläder.',
  desc6: 'Återvinner papper och gör anteckningsböcker och skolmaterial.',
  desc7: 'Använder återvunna glasflaskor för att skapa isoleringsmaterial till hem.',
  desc8: 'Konverterar använda kaffebönor till biobränsle för lokala företag.',
  desc9: 'Återanvänder skrot från bilar och apparater till offentliga konstverk.',
  desc10: 'Samlar plast från havet och gör hållbara förpackningslösningar.'
};

const ProjectCards: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('name')
      .limit(3);
    
    if (error) {
      console.error('Error fetching projects:', error);
    } else {
      setProjects(data as Project[]);
    }
  };

  const getRandomImage = (): string => {
    const imageKeys = Object.keys(images) as (keyof typeof images)[]; 
    const randomKey = imageKeys[Math.floor(Math.random() * imageKeys.length)];
    return images[randomKey];
  };

  const getRandomDescription = (): string => {
    const descriptionKeys = Object.keys(descriptions) as (keyof typeof descriptions)[];
    const randomKey = descriptionKeys[Math.floor(Math.random() * descriptionKeys.length)];
    return descriptions[randomKey];
  };
  return (
    <div className="flex flex-col w-full justify-center items-center max-w-3xl mx-auto">
      <h2 className="text-4xl font-poppins font-bold mt-16 text-[#2d4352]">
        Senaste projekt
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {projects.map((project, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out">
             <div className="h-40 bg-gray-200">
              <img 
                src={getRandomImage()} 
                alt={`Project ${project.name}`} 
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-[#2d4352] mb-2">{project.name}</h3>
              <p className="text-sm text-gray-600">{getRandomDescription()}</p>
            </div>
            <div className="px-4 py-3 bg-gray-50">
              <button className="text-sm text-blue-600 font-medium hover:underline">
                Mer information
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectCards;