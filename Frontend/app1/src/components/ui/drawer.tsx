import * as React from "react";
import { cn } from "@/lib/utils";

// Vaul is not installed in this workspace, so the wrapper uses a minimal local implementation
// that preserves the same component names and props shape for the app's UI usage.
type DrawerPrimitiveComponentProps = React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode };

type DrawerPrimitiveRootProps = React.HTMLAttributes<HTMLElement> & {
  shouldScaleBackground?: boolean;
  children?: React.ReactNode;
};

type DrawerPrimitiveContextValue = {
  open?: boolean;
};

const DrawerContext = React.createContext<DrawerPrimitiveContextValue>({});

const DrawerPrimitiveRoot = ({ children, shouldScaleBackground: _shouldScaleBackground, ...props }: DrawerPrimitiveRootProps) => (
  <DrawerContext.Provider value={{ open: true }}>
    <div {...props}>{children}</div>
  </DrawerContext.Provider>
);

const DrawerPrimitiveTrigger = ({ children, ...props }: DrawerPrimitiveComponentProps) => <button type="button" {...props}>{children}</button>;
const DrawerPrimitivePortal = ({ children }: { children?: React.ReactNode }) => <>{children}</>;
const DrawerPrimitiveClose = ({ children, ...props }: DrawerPrimitiveComponentProps) => <button type="button" {...props}>{children}</button>;
const DrawerPrimitiveOverlay = React.forwardRef<HTMLDivElement, DrawerPrimitiveComponentProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("fixed inset-0 z-50 bg-black/80", className)} {...props} />
));
DrawerPrimitiveOverlay.displayName = "DrawerOverlay";

const DrawerPrimitiveContent = React.forwardRef<HTMLDivElement, DrawerPrimitiveComponentProps>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background", className)} {...props}>
    <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
    {children}
  </div>
));
DrawerPrimitiveContent.displayName = "DrawerContent";

const DrawerPrimitiveTitle = React.forwardRef<HTMLHeadingElement, DrawerPrimitiveComponentProps>(({ className, ...props }, ref) => (
  <h2 ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
));
DrawerPrimitiveTitle.displayName = "DrawerTitle";

const DrawerPrimitiveDescription = React.forwardRef<HTMLParagraphElement, DrawerPrimitiveComponentProps>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
DrawerPrimitiveDescription.displayName = "DrawerDescription";

const Drawer = ({ shouldScaleBackground = true, ...props }: DrawerPrimitiveRootProps) => (
  <DrawerPrimitiveRoot shouldScaleBackground={shouldScaleBackground} {...props} />
);
Drawer.displayName = "Drawer";

const DrawerTrigger = DrawerPrimitiveTrigger;
const DrawerPortal = DrawerPrimitivePortal;
const DrawerClose = DrawerPrimitiveClose;
const DrawerOverlay = DrawerPrimitiveOverlay;
const DrawerContent = DrawerPrimitiveContent;
const DrawerTitle = DrawerPrimitiveTitle;
const DrawerDescription = DrawerPrimitiveDescription;

const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)} {...props} />
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props} />
);
DrawerFooter.displayName = "DrawerFooter";

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
