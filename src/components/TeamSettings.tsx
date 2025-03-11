
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SaveIcon, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TeamCardProps } from "@/components/TeamCard";

interface TeamSettingsProps {
  team: TeamCardProps;
  setTeam: React.Dispatch<React.SetStateAction<TeamCardProps | null>>;
}

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Team name must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  status: z.enum(["active", "inactive", "draft"]),
});

type FormValues = z.infer<typeof formSchema>;

const TeamSettings = ({ team, setTeam }: TeamSettingsProps) => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: team.name,
      description: team.description,
      status: team.status,
    },
  });

  function onSubmit(values: FormValues) {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setTeam({
        ...team,
        name: values.name,
        description: values.description,
        status: values.status,
      });
      
      setIsSaving(false);
      
      toast({
        title: "Settings saved",
        description: "Your team settings have been updated successfully.",
      });
    }, 1000);
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Team Settings</CardTitle>
          <CardDescription>
            Update your team information and configuration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team Name</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., Customer Support Team" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the name of your team that will be displayed to users.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe the purpose of this team..." 
                        className="min-h-24"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a clear description of what this team does.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select team status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Active teams are live and processing requests.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" disabled={isSaving} className="w-full sm:w-auto">
                {isSaving ? (
                  <>Saving...</>
                ) : (
                  <>
                    <SaveIcon className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card className="border-red-100">
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
          <CardDescription>
            Actions here can't be undone. Be careful.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-600 mb-4">
            Deleting a team removes all associated bots, conversations, and data. This action cannot be reversed.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Team
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TeamSettings;
