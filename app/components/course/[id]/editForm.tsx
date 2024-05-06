import CreateForm from "../create/form";

type EditFormType = {
  title: string;
  description: string;
  instructorName: string;
  logoUrl: string;
  action: (formData: FormData) => void;
};

export default function EditForm({
  title,
  description,
  instructorName,
  logoUrl,
  action
}: EditFormType) {
  return (
    <CreateForm
      title={title}
      description={description}
      instructorName={instructorName}
      logoUrl={logoUrl}
      action={action}
    />
  );
}
