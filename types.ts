import React from 'react';

export type UtilityCategory = 'Calculators' | 'Converters' | 'Generators' | 'Formatters & Validators';

export interface Utility {
  id: string;
  name: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  component: React.FC;
  category: UtilityCategory;
}