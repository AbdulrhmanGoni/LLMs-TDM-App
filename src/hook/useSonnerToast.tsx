import { ExternalToast, toast } from "sonner";

type FeedbackVariants = "error" | "info" | "success" | "warning";

type SonnerToastProps = {
  title: string;
  description?: string;
  variant: FeedbackVariants;
};

const variantsColors: Record<FeedbackVariants, string> = {
  error: "text-red-700",
  info: "text-blue-600",
  warning: "text-yellow-700",
  success: "text-green-500",
};

export default function useSonnerToast() {
  return ({ title, variant, description }: SonnerToastProps) => {
    const config: ExternalToast = {
      description,
      className: 'items-start',
      classNames: {
        icon: `m-0 mt-1 ${variantsColors[variant]}`,
      }
    }
    toast[variant](title, config);
  };
}
