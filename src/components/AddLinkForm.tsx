import { useState, useRef } from 'react'
import { Plus, Link as LinkIcon, Upload, Image } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

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
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result as string
          setFormData({ ...formData, icon: result })
        }
        reader.readAsDataURL(file)
      }
    }
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
        
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Icon (optional)</label>
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
                placeholder="Icon URL"
                value={formData.icon.startsWith('data:') ? '' : formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
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
                  Choose Image File
                </Button>
                {formData.icon.startsWith('data:') && (
                  <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                    <Image className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Image uploaded</span>
                    <img 
                      src={formData.icon} 
                      alt="Uploaded icon" 
                      className="w-8 h-8 rounded object-cover ml-auto"
                    />
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
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