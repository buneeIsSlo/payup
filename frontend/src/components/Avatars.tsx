export const FriendsAvatar = ({ initial }: { initial: string }) => {
  return (
    <span className="h-8 w-8 bg-muted-foreground grid place-items-center rounded-full">
      <span className="text-muted text-base h-full flex items-center leading-[0]">
        {initial.toLocaleUpperCase()}
      </span>
    </span>
  );
};
