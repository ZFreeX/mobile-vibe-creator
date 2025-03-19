
import React, { useState } from 'react';
import FloatingCard from './ui/FloatingCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, 
  Users, 
  Wind, 
  Layers, 
  AlertTriangle,
  HelpCircle,
  Share2,
  BookmarkPlus,
  Clock
} from 'lucide-react';
import { useUserType } from '@/context/UserTypeContext';
import { useAnimationOnMount } from '@/utils/animations';

interface PropertyDetailProps {
  propertyId?: string;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ propertyId = '1' }) => {
  const { userType } = useUserType();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Animations
  const cardAnimation = useAnimationOnMount('animate-scale-in', 300);
  
  // Mock property data
  const property = {
    id: propertyId,
    name: 'Riverside Development Site',
    address: '1234 Main Street, New York, NY 10001',
    size: '2.5 acres',
    zoning: 'Mixed-use Commercial',
    features: [
      { label: 'Public Transportation', value: 'Excellent', score: 95 },
      { label: 'Schools Nearby', value: 'Good', score: 82 },
      { label: 'Shopping Access', value: 'Excellent', score: 90 },
      { label: 'Healthcare Facilities', value: 'Average', score: 75 }
    ],
    risks: [
      { label: 'Flood Risk', value: 'Moderate', score: 65 },
      { label: 'Traffic Congestion', value: 'High', score: 45 }
    ]
  };
  
  // Get tab data based on user type
  const getTabs = () => {
    const commonTabs = [
      { id: 'overview', label: 'Overview', icon: <Building2 className="h-4 w-4" /> },
      { id: 'demographics', label: 'Demographics', icon: <Users className="h-4 w-4" /> },
      { id: 'environment', label: 'Environment', icon: <Layers className="h-4 w-4" /> },
      { id: 'risks', label: 'Risks', icon: <AlertTriangle className="h-4 w-4" /> }
    ];
    
    switch (userType) {
      case 'developer':
        return [
          ...commonTabs,
          { id: 'regulations', label: 'Regulations', icon: <HelpCircle className="h-4 w-4" /> }
        ];
      case 'business':
        return [
          ...commonTabs,
          { id: 'market', label: 'Market', icon: <Users className="h-4 w-4" /> }
        ];
      case 'residential':
        return [
          ...commonTabs,
          { id: 'lifestyle', label: 'Lifestyle', icon: <Wind className="h-4 w-4" /> }
        ];
      default:
        return commonTabs;
    }
  };
  
  const tabs = getTabs();
  
  // Score color based on value
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 px-6 py-8 pb-24">
      <FloatingCard className={`mb-6 ${cardAnimation}`}>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold mb-1">{property.name}</h1>
            <p className="text-muted-foreground">{property.address}</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <BookmarkPlus className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Property image */}
        <div className="mt-4 h-48 bg-muted rounded-lg flex items-center justify-center">
          <Building2 className="h-12 w-12 text-muted-foreground" />
        </div>
        
        {/* Key details */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="p-3 bg-secondary rounded-lg">
            <p className="text-sm text-muted-foreground">Size</p>
            <p className="font-medium">{property.size}</p>
          </div>
          <div className="p-3 bg-secondary rounded-lg">
            <p className="text-sm text-muted-foreground">Zoning</p>
            <p className="font-medium">{property.zoning}</p>
          </div>
        </div>
      </FloatingCard>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full mb-6 overflow-x-auto flex justify-start">
          {tabs.map(tab => (
            <TabsTrigger 
              key={tab.id} 
              value={tab.id}
              className="flex items-center"
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              <span className="ml-2">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <FloatingCard>
            <h2 className="text-lg font-medium mb-4">Location Features</h2>
            <div className="space-y-3">
              {property.features.map(feature => (
                <div key={feature.label} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{feature.label}</p>
                    <p className="text-sm text-muted-foreground">{feature.value}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-12 h-2 rounded-full ${getScoreColor(feature.score)}`} />
                    <span className="text-sm font-medium">{feature.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </FloatingCard>
          
          <FloatingCard>
            <h2 className="text-lg font-medium mb-4">Potential Risks</h2>
            <div className="space-y-3">
              {property.risks.map(risk => (
                <div key={risk.label} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{risk.label}</p>
                    <p className="text-sm text-muted-foreground">{risk.value}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-12 h-2 rounded-full ${getScoreColor(risk.score)}`} />
                    <span className="text-sm font-medium">{risk.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </FloatingCard>
          
          {userType === 'developer' && (
            <FloatingCard>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-medium">Development Potential</h2>
                  <p className="text-muted-foreground">Based on zoning and location analysis</p>
                </div>
                <div className="p-3 bg-green-100 text-green-800 rounded-lg font-medium">
                  High
                </div>
              </div>
            </FloatingCard>
          )}
          
          {userType === 'business' && (
            <FloatingCard>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-medium">Business Viability</h2>
                  <p className="text-muted-foreground">Based on market and location analysis</p>
                </div>
                <div className="p-3 bg-green-100 text-green-800 rounded-lg font-medium">
                  Excellent
                </div>
              </div>
            </FloatingCard>
          )}
          
          {userType === 'residential' && (
            <FloatingCard>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-medium">Livability Score</h2>
                  <p className="text-muted-foreground">Based on amenities and services</p>
                </div>
                <div className="p-3 bg-green-100 text-green-800 rounded-lg font-medium">
                  92/100
                </div>
              </div>
            </FloatingCard>
          )}
          
          <FloatingCard>
            <div className="flex items-center text-muted-foreground text-sm">
              <Clock className="h-4 w-4 mr-2" />
              <span>Last updated: May 15, 2023</span>
            </div>
          </FloatingCard>
        </TabsContent>
        
        <TabsContent value="demographics">
          <FloatingCard>
            <h2 className="text-lg font-medium mb-4">Demographics</h2>
            <p className="text-muted-foreground mb-4">Population statistics for this area</p>
            
            <div className="space-y-3">
              <div className="p-3 bg-secondary rounded-lg">
                <p className="text-sm text-muted-foreground">Total Population</p>
                <p className="font-medium text-lg">28,450</p>
              </div>
              
              <div className="p-3 bg-secondary rounded-lg">
                <p className="text-sm text-muted-foreground">Median Age</p>
                <p className="font-medium text-lg">36.5 years</p>
              </div>
              
              <div className="p-3 bg-secondary rounded-lg">
                <p className="text-sm text-muted-foreground">Average Household Income</p>
                <p className="font-medium text-lg">$86,500</p>
              </div>
              
              <div className="p-3 bg-secondary rounded-lg">
                <p className="text-sm text-muted-foreground">Education Level (Bachelor's or higher)</p>
                <p className="font-medium text-lg">48%</p>
              </div>
            </div>
          </FloatingCard>
        </TabsContent>
        
        <TabsContent value="environment">
          <FloatingCard>
            <h2 className="text-lg font-medium mb-4">Environmental Factors</h2>
            <p className="text-muted-foreground mb-4">Climate and environmental conditions</p>
            
            <div className="space-y-3">
              <div className="p-3 bg-secondary rounded-lg">
                <p className="text-sm text-muted-foreground">Air Quality Index</p>
                <p className="font-medium text-lg">Good (45)</p>
              </div>
              
              <div className="p-3 bg-secondary rounded-lg">
                <p className="text-sm text-muted-foreground">Noise Level</p>
                <p className="font-medium text-lg">Moderate</p>
              </div>
              
              <div className="p-3 bg-secondary rounded-lg">
                <p className="text-sm text-muted-foreground">Green Space Proximity</p>
                <p className="font-medium text-lg">2 parks within 0.5 miles</p>
              </div>
              
              <div className="p-3 bg-secondary rounded-lg">
                <p className="text-sm text-muted-foreground">Solar Potential</p>
                <p className="font-medium text-lg">High</p>
              </div>
            </div>
          </FloatingCard>
        </TabsContent>
        
        <TabsContent value="risks">
          <FloatingCard>
            <h2 className="text-lg font-medium mb-4">Risk Assessment</h2>
            <p className="text-muted-foreground mb-4">Potential hazards and risks</p>
            
            <div className="space-y-3">
              <div className="p-3 bg-secondary rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Flood Risk</p>
                    <p className="text-sm text-muted-foreground">Moderate</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-12 h-2 rounded-full bg-yellow-500" />
                    <span className="text-sm font-medium">65</span>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-secondary rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Earthquake Risk</p>
                    <p className="text-sm text-muted-foreground">Low</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-12 h-2 rounded-full bg-green-500" />
                    <span className="text-sm font-medium">92</span>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-secondary rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Crime Rate</p>
                    <p className="text-sm text-muted-foreground">Average</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-12 h-2 rounded-full bg-yellow-500" />
                    <span className="text-sm font-medium">78</span>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-secondary rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Traffic Congestion</p>
                    <p className="text-sm text-muted-foreground">High</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-12 h-2 rounded-full bg-red-500" />
                    <span className="text-sm font-medium">45</span>
                  </div>
                </div>
              </div>
            </div>
          </FloatingCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PropertyDetail;
