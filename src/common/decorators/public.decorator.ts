import { SetMetadata } from "@nestjs/common";

// this decrator used to make a request public by skip Guards check and provide user data
export const Public = () => SetMetadata('public', true);