import { useState } from 'react'
import { Plus, Link as LinkIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface AddLinkFormProps {
  onAdd: (data: { title: string; url: string; icon?: string }) => void
}

export function AddLinkForm({ onAdd }: AddLinkFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    icon: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.title.trim() && formData.url.trim()) {
      onAdd({
        title: formData.title.trim(),
        url: formData.url.trim(),
        icon: formData.icon.trim() || undefined
      })
      setFormData({ title: '', url: '', icon: '' })
      setIsOpen(false)
    }
  }

  const handleCancel = () => {
    setFormData({ title: '', url: '', icon: '' })
    setIsOpen(false)
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="w-full py-8 border-dashed border-2 hover:border-primary/50 hover:bg-gradient-secondary"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add New Link
      </Button>
    )
  }

  return (
    <Card className="p-4 bg-card/50 backdrop-blur-sm border border-border/50 shadow-card-custom">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <LinkIcon className="w-5 h-5 text-primary" />
          <h3 className="font-medium">Add New Link</h3>
        </div>
        
        <Input
          placeholder="Link title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        
        <Input
          placeholder="URL (https://...)"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          required
        />
        
        <Input
          placeholder="Icon URL (optional)"
          value={formData.icon}
          onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
        />
        
        <div className="flex gap-2">
          <Button type="submit" className="flex-1">
            <Plus className="w-4 h-4 mr-2" />
            Add Link
          </Button>
          <Button type="button" onClick={handleCancel} variant="outline" className="flex-1">
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  )
}