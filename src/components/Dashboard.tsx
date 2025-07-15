import { useState } from 'react'
import { LogOut, Share } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ThemeToggle'
import { ProfileEditor } from '@/components/ProfileEditor'
import { LinkCard } from '@/components/LinkCard'
import { AddLinkForm } from '@/components/AddLinkForm'
import { useToast } from '@/hooks/use-toast'

interface Link {
  id: string
  title: string
  url: string
  icon?: string
  clicks: number
}

interface Profile {
  avatar: string
  name: string
  bio: string
}

interface DashboardProps {
  onLogout: () => void
}

export function Dashboard({ onLogout }: DashboardProps) {
  const { toast } = useToast()
  
  const [profile, setProfile] = useState<Profile>({
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    name: 'John Doe',
    bio: 'Creator, developer, and link enthusiast'
  })

  const [links, setLinks] = useState<Link[]>([
    {
      id: '1',
      title: 'My Portfolio',
      url: 'https://portfolio.example.com',
      icon: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=32',
      clicks: 42
    },
    {
      id: '2',
      title: 'GitHub Profile',
      url: 'https://github.com/johndoe',
      icon: 'https://github.com/favicon.ico',
      clicks: 28
    },
    {
      id: '3',
      title: 'LinkedIn',
      url: 'https://linkedin.com/in/johndoe',
      clicks: 15
    }
  ])

  const handleProfileSave = (newProfile: Profile) => {
    setProfile(newProfile)
    toast({
      title: "Profile updated",
      description: "Your profile has been saved successfully.",
    })
  }

  const handleAddLink = (data: { title: string; url: string; icon?: string }) => {
    const newLink: Link = {
      id: Date.now().toString(),
      title: data.title,
      url: data.url,
      icon: data.icon,
      clicks: 0
    }
    setLinks([...links, newLink])
    toast({
      title: "Link added",
      description: "Your new link has been added successfully.",
    })
  }

  const handleEditLink = (id: string, data: Partial<Link>) => {
    setLinks(links.map(link => 
      link.id === id ? { ...link, ...data } : link
    ))
    toast({
      title: "Link updated",
      description: "Your link has been updated successfully.",
    })
  }

  const handleDeleteLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id))
    toast({
      title: "Link deleted",
      description: "Your link has been deleted successfully.",
    })
  }

  const handleMoveUp = (id: string) => {
    const index = links.findIndex(link => link.id === id)
    if (index > 0) {
      const newLinks = [...links]
      ;[newLinks[index - 1], newLinks[index]] = [newLinks[index], newLinks[index - 1]]
      setLinks(newLinks)
    }
  }

  const handleMoveDown = (id: string) => {
    const index = links.findIndex(link => link.id === id)
    if (index < links.length - 1) {
      const newLinks = [...links]
      ;[newLinks[index], newLinks[index + 1]] = [newLinks[index + 1], newLinks[index]]
      setLinks(newLinks)
    }
  }

  const handleTrackClick = (id: string) => {
    setLinks(links.map(link => 
      link.id === id ? { ...link, clicks: link.clicks + 1 } : link
    ))
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "Link copied",
      description: "Your profile link has been copied to clipboard.",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-background">
      <header className="sticky top-0 z-50 border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            LinkTree Dashboard
          </h1>
          <div className="flex items-center gap-2">
            <Button onClick={handleShare} variant="outline" size="sm">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
            <ThemeToggle />
            <Button onClick={onLogout} variant="ghost" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="space-y-6">
          <ProfileEditor profile={profile} onSave={handleProfileSave} />
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Your Links</h2>
            
            {links.map((link, index) => (
              <LinkCard
                key={link.id}
                link={link}
                onEdit={handleEditLink}
                onDelete={handleDeleteLink}
                onMoveUp={handleMoveUp}
                onMoveDown={handleMoveDown}
                onTrackClick={handleTrackClick}
                canMoveUp={index > 0}
                canMoveDown={index < links.length - 1}
              />
            ))}
            
            <AddLinkForm onAdd={handleAddLink} />
          </div>
        </div>
      </main>
    </div>
  )
}