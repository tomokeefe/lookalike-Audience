import { ResponsiveCreateAudience } from "@/components/ResponsiveCreateAudience";
import { useMobile } from "@/hooks/use-mobile";

const CreateAudience = () => {
  const isMobile = useMobile();

  return <ResponsiveCreateAudience isMobile={isMobile} />;
};
export default CreateAudience;
