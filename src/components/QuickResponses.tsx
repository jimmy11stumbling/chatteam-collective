
import { useState } from "react";
import { PlusIcon, Pencil, Trash2, X, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface QuickResponse {
  id: string;
  name: string;
  content: string;
}

const QuickResponses = () => {
  const { toast } = useToast();
  const [responses, setResponses] = useState<QuickResponse[]>([
    {
      id: "1",
      name: "Greeting",
      content: "Hello! I'm your AI assistant. How can I help you today?"
    },
    {
      id: "2",
      name: "Thank You",
      content: "Thank you for your inquiry. Is there anything else I can help you with?"
    },
    {
      id: "3",
      name: "More Information",
      content: "To better assist you, could you please provide more information about your request?"
    }
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newName, setNewName] = useState("");
  const [newContent, setNewContent] = useState("");
  
  const startAddNew = () => {
    setIsAdding(true);
    setNewName("");
    setNewContent("");
  };
  
  const startEditing = (response: QuickResponse) => {
    setEditingId(response.id);
    setNewName(response.name);
    setNewContent(response.content);
  };
  
  const cancelAddOrEdit = () => {
    setIsAdding(false);
    setEditingId(null);
  };
  
  const saveNew = () => {
    if (!newName || !newContent) return;
    
    const newResponse: QuickResponse = {
      id: Date.now().toString(),
      name: newName,
      content: newContent
    };
    
    setResponses(prev => [...prev, newResponse]);
    setIsAdding(false);
    
    toast({
      title: "Response added",
      description: `Quick response "${newName}" has been added.`
    });
  };
  
  const saveEdit = () => {
    if (!editingId || !newName || !newContent) return;
    
    setResponses(prev => 
      prev.map(response => 
        response.id === editingId 
          ? { ...response, name: newName, content: newContent } 
          : response
      )
    );
    
    setEditingId(null);
    
    toast({
      title: "Response updated",
      description: `Quick response "${newName}" has been updated.`
    });
  };
  
  const deleteResponse = (id: string) => {
    const response = responses.find(r => r.id === id);
    
    setResponses(prev => prev.filter(response => response.id !== id));
    
    toast({
      title: "Response deleted",
      description: `Quick response "${response?.name}" has been deleted.`
    });
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle>Quick Responses</CardTitle>
          <CardDescription>
            Predefined responses for common questions
          </CardDescription>
        </div>
        <Button 
          size="sm" 
          onClick={startAddNew}
          disabled={isAdding || !!editingId}
          className="bg-blue-500 hover:bg-blue-600"
        >
          <PlusIcon className="h-4 w-4 mr-1" />
          Add New
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {isAdding && (
          <div className="border p-4 rounded-lg space-y-3">
            <div>
              <Input
                placeholder="Response name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="mb-2"
              />
              <Textarea
                placeholder="Response content"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                rows={3}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={cancelAddOrEdit}
              >
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
              <Button 
                size="sm" 
                onClick={saveNew}
                disabled={!newName || !newContent}
                className="bg-green-500 hover:bg-green-600"
              >
                <Check className="h-4 w-4 mr-1" />
                Save
              </Button>
            </div>
          </div>
        )}
        
        {responses.map(response => (
          <div 
            key={response.id} 
            className="border p-4 rounded-lg hover:border-blue-200 transition-colors"
          >
            {editingId === response.id ? (
              <div className="space-y-3">
                <div>
                  <Input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="mb-2"
                  />
                  <Textarea
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={cancelAddOrEdit}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Cancel
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={saveEdit}
                    disabled={!newName || !newContent}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium">{response.name}</h3>
                  <div className="flex space-x-1">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => startEditing(response)}
                      disabled={!!editingId || isAdding}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-red-500 hover:bg-red-50 hover:text-red-600"
                      onClick={() => deleteResponse(response.id)}
                      disabled={!!editingId || isAdding}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-neutral-600">{response.content}</p>
              </>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default QuickResponses;
