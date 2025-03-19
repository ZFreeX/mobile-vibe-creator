
import Layout from "@/components/Layout";
import GlassCard from "@/components/GlassCard";
import { Moon, Sun, User, Bell, Info, ChevronRight } from "lucide-react";

const SettingsPage = () => {
  const settingsGroups = [
    {
      title: "Account",
      items: [
        { icon: User, label: "Profile", action: () => {} },
        { icon: Bell, label: "Notifications", action: () => {} }
      ]
    },
    {
      title: "Appearance",
      items: [
        { icon: Sun, label: "Light Mode", action: () => {} },
        { icon: Moon, label: "Dark Mode", action: () => {} }
      ]
    },
    {
      title: "About",
      items: [
        { icon: Info, label: "App Info", action: () => {} }
      ]
    }
  ];

  return (
    <Layout>
      <div className="py-8 space-y-6 animate-fade-in">
        <h1 className="text-2xl font-bold text-center">Settings</h1>
        
        <div className="w-full max-w-md mx-auto mt-8 space-y-6">
          {settingsGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="space-y-2">
              <h2 className="text-sm font-medium text-muted-foreground px-1">
                {group.title}
              </h2>
              
              <GlassCard className="p-0 divide-y divide-white/10">
                {group.items.map((item, itemIndex) => {
                  const Icon = item.icon;
                  
                  return (
                    <div 
                      key={itemIndex}
                      className="flex items-center justify-between py-3 px-4 cursor-pointer interactive"
                      onClick={item.action}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon size={18} className="text-primary" />
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight size={18} className="text-muted-foreground" />
                    </div>
                  );
                })}
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
