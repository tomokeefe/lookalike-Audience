import { ResponsiveCreateAudience } from "@/components/ResponsiveCreateAudience";
import { useIsMobile } from "@/hooks/use-mobile";

const CreateAudience = () => {
  const isMobile = useIsMobile();

  return <ResponsiveCreateAudience isMobile={isMobile} />;
};
export default CreateAudience;
