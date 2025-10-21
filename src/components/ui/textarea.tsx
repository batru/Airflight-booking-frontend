import * as React from "react";

import { cn } from "./utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "resize-none border-gray-200 placeholder:text-gray-500 focus-visible:border-gray-500 focus-visible:ring-gray-500/50 aria-invalid:ring-red-600/20 aria-invalid:border-red-600 flex field-sizing-content min-h-16 w-full rounded-md border bg-gray-50 px-3 py-2 text-base transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
