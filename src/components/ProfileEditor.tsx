import { useState, useRef } from 'react'
import { User, Camera, Save, Upload, Image, Link as LinkIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Profile {
  avatar: string
  name: string
  bio: string
}

interface ProfileEditorProps {
  profile: Profile
  onSave: (profile: Profile) => void
}

export function ProfileEditor({ profile, onSave }: ProfileEditorProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(profile)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSave = () => {
    onSave(editData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData(profile)
    setIsEditing(false)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result as string
          setEditData({ ...editData, avatar: result })
        }
        reader.readAsDataURL(file)
      }
    }
  }

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border border-border/50 shadow-card-custom">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative group">
          <Avatar className="w-24 h-24 ring-4 ring-primary/20">
            <AvatarImage src={editData.avatar} alt={editData.name} />
            <AvatarFallback className="bg-gradient-primary text-primary-foreground text-2xl">
              {editData.name.split(' ').map(n => n[0]).join('').toUpperCase() || <User className="w-8 h-8" />}
            </AvatarFallback>
          </Avatar>
          {isEditing && (
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-6 h-6 text-white" />
            </div>
          )}
        </div>

        {isEditing ? (
          <div className="w-full max-w-sm space-y-4">
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">Profile Picture</label>
              <Tabs defaultValue="url" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="url" className="flex items-center gap-2">
                    <LinkIcon className="w-4 h-4" />
                    URL
                  </TabsTrigger>
                  <TabsTrigger value="upload" className="flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="url" className="mt-3">
                  <Input
                    placeholder="Avatar URL"
                    value={editData.avatar.startsWith('data:') ? '' : editData.avatar}
                    onChange={(e) => setEditData({ ...editData, avatar: e.target.value })}
                  />
                </TabsContent>
                
                <TabsContent value="upload" className="mt-3">
                  <div className="space-y-3">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Choose Profile Picture
                    </Button>
                    {editData.avatar.startsWith('data:') && (
                      <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                        <Image className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Image uploaded</span>
                        <img 
                          src={editData.avatar} 
                          alt="Uploaded avatar" 
                          className="w-8 h-8 rounded-full object-cover ml-auto"
                        />
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <Input
              placeholder="Your name"
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            />
            <Textarea
              placeholder="Bio"
              value={editData.bio}
              onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
              rows={3}
            />
            <div className="flex gap-2">
              <Button onClick={handleSave} className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button onClick={handleCancel} variant="outline" className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">{profile.name}</h1>
            <p className="text-muted-foreground mt-2">{profile.bio}</p>
            <Button
              onClick={() => setIsEditing(true)}
              variant="outline"
              className="mt-4"
            >
              Edit Profile
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}