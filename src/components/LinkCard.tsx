import { useState } from 'react'
import { ExternalLink, Edit2, Trash2, ArrowUp, ArrowDown, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

interface Link {
  id: string
  title: string
  url: string
  icon?: string
  clicks: number
}

interface LinkCardProps {
  link: Link
  onEdit: (id: string, data: Partial<Link>) => void
  onDelete: (id: string) => void
  onMoveUp: (id: string) => void
  onMoveDown: (id: string) => void
  onTrackClick: (id: string) => void
  canMoveUp: boolean
  canMoveDown: boolean
}

export function LinkCard({ 
  link, 
  onEdit, 
  onDelete, 
  onMoveUp, 
  onMoveDown, 
  onTrackClick,
  canMoveUp,
  canMoveDown 
}: LinkCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    title: link.title,
    url: link.url,
    icon: link.icon || ''
  })

  const handleSave = () => {
    onEdit(link.id, editData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData({
      title: link.title,
      url: link.url,
      icon: link.icon || ''
    })
    setIsEditing(false)
  }

  const handleClick = () => {
    onTrackClick(link.id)
    window.open(link.url, '_blank')
  }

  if (isEditing) {
    return (
      <Card className="p-4 bg-card/50 backdrop-blur-sm border border-border/50 hover:shadow-card-custom transition-all duration-300">
        <div className="space-y-3">
          <Input
            placeholder="Link title"
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
          />
          <Input
            placeholder="URL"
            value={editData.url}
            onChange={(e) => setEditData({ ...editData, url: e.target.value })}
          />
          <Input
            placeholder="Icon URL (optional)"
            value={editData.icon}
            onChange={(e) => setEditData({ ...editData, icon: e.target.value })}
          />
          <div className="flex gap-2">
            <Button onClick={handleSave} size="sm">Save</Button>
            <Button onClick={handleCancel} variant="outline" size="sm">Cancel</Button>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="group p-4 bg-card/50 backdrop-blur-sm border border-border/50 hover:shadow-card-custom hover:scale-[1.02] transition-all duration-300">
      <div className="flex items-center justify-between">
        <div 
          className="flex items-center gap-3 flex-1 cursor-pointer"
          onClick={handleClick}
        >
          {link.icon && (
            <img 
              src={link.icon} 
              alt="" 
              className="w-8 h-8 rounded-lg object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-foreground truncate">{link.title}</h3>
            <p className="text-sm text-muted-foreground truncate">{link.url}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <BarChart3 className="w-3 h-3" />
              {link.clicks}
            </Badge>
            <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
        
        <div className="flex items-center gap-1 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            onClick={() => onMoveUp(link.id)}
            disabled={!canMoveUp}
            variant="ghost"
            size="icon"
            className="h-8 w-8"
          >
            <ArrowUp className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => onMoveDown(link.id)}
            disabled={!canMoveDown}
            variant="ghost"
            size="icon"
            className="h-8 w-8"
          >
            <ArrowDown className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => setIsEditing(true)}
            variant="ghost"
            size="icon"
            className="h-8 w-8"
          >
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => onDelete(link.id)}
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}