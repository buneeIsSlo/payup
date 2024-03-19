export const AvatarSm = ({ initial }: { initial: string }) => {
  return (
    <span className="h-8 w-8 bg-muted-foreground grid place-items-center rounded-full">
      <span className="text-muted text-base h-full flex items-center leading-[0]">
        {initial.toUpperCase()}
      </span>
    </span>
  );
};

export function AvatarMd({ initial }: { initial: string }) {
  return (
    <span className="h-10 w-10 bg-primary-foreground outline outline-1 outline-primary grid place-items-center rounded-full">
      <span className="text-primary text-xl h-full flex items-center leading-[0]">
        {initial.toUpperCase()}
      </span>
    </span>
  );
}

export function AvatarLg({ initial }: { initial: string }) {
  return (
    <span className="absolute -top-[50%] translate-y-6 md:translate-y-6 lg:translate-y-5 left-[50%] -translate-x-[50%] h-14 w-14 lg:h-[4.5rem] lg:w-[4.5rem] bg-white outline outline-2 outline-primary grid place-items-center rounded-full">
      <span className="text-primary text-xl font-semibold lg:text-2xl h-full flex items-center leading-[0]">
        {initial.toLocaleUpperCase()}
      </span>
    </span>
  );
}
