import React from "react";
import { cn } from "@/lib/utils";
import { transactionCategoryStyles } from "@/constants/constants";

interface CategoryBadgeProps {
   category: string;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category }) => {
   const {
      borderColor,
      backgroundColor,
      textColor,
      chipBackgroundColor,
   } = transactionCategoryStyles[category as keyof typeof transactionCategoryStyles] || transactionCategoryStyles.default;

   return (
      <div className={cn('category-badge', borderColor, chipBackgroundColor)}>
         <div className={cn('size-2 rounded-full', backgroundColor)} />
         <p className={cn('text-sm font-medium', textColor)}>{category}</p>
      </div>
   );
};

export default CategoryBadge;