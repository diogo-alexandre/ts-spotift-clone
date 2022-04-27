import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function IsEqualTo (property: string, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'isEqualTo',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate: (value: any, args: ValidationArguments): boolean => {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return value === relatedValue;
        },
        defaultMessage (args: ValidationArguments) {
          const [relatedPropertyName]: string[] = args.constraints;
          return `${propertyName} must be equal to "${relatedPropertyName}"`;
        }
      }
    });
  };
}
