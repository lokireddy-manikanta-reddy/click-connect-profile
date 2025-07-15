import { useState } from 'react'
import { User, Camera, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

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

  const handleSave = () => {
    onSave(editData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData(profile)
    setIsEditing(false)
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
            <Input
              placeholder="Avatar URL"
              value={editData.avatar}
              onChange={(e) => setEditData({ ...editData, avatar: e.target.value })}
            />
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