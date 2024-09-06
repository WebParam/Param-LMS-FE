import CreateForm from "../create/form";

type CreateFormType = {
    title?: string;
    description?: string;
    projectLogoUrl?: string;
    duration: string;
    action: (formData: FormData) => void;
  };

  export default function EditForm({ title, description, projectLogoUrl,duration, action}: CreateFormType)  {
    return (
        <CreateForm
        title={title}
        description={description}
        projectLogoUrl={projectLogoUrl}
        duration={duration}
        action={action}
      />
    );
  }
