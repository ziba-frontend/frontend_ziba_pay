// constants/transactionCategoryStyles.ts

export const transactionCategoryStyles = {
    "Food and Drink": {
       borderColor: "border-pink-600",
       backgroundColor: "bg-pink-500",
       textColor: "text-pink-700",
       chipBackgroundColor: "bg-inherit",
    },
    Payment: {
       borderColor: "border-success-600",
       backgroundColor: "bg-green-600",
       textColor: "text-success-700",
       chipBackgroundColor: "bg-inherit",
    },
    "Bank Fees": {
       borderColor: "border-success-600",
       backgroundColor: "bg-green-600",
       textColor: "text-success-700",
       chipBackgroundColor: "bg-inherit",
    },
    Transfer: {
       borderColor: "border-red-700",
       backgroundColor: "bg-red-700",
       textColor: "text-red-700",
       chipBackgroundColor: "bg-inherit",
    },
    Processing: {
       borderColor: "border-gray-500",
       backgroundColor: "bg-gray-500",
       textColor: "text-gray-700",
       chipBackgroundColor: "bg-gray-200",
    },
    Success: {
       borderColor: "border-green-600",
       backgroundColor: "bg-green-600",
       textColor: "text-green-700",
       chipBackgroundColor: "bg-green-200",
    },
    Travel: {
       borderColor: "border-blue-500",
       backgroundColor: "bg-blue-500",
       textColor: "text-blue-700",
       chipBackgroundColor: "bg-blue-200",
    },
    Pending: {
       borderColor: "border-yellow-500",
       backgroundColor: "bg-yellow-500",
       textColor: "text-yellow-700",
       chipBackgroundColor: "bg-yellow-200",
    },
    Failed: {
       borderColor: "border-red-600",
       backgroundColor: "bg-red-600",
       textColor: "text-red-700",
       chipBackgroundColor: "bg-red-200",
    },
    Completed: {
       borderColor: "border-gray-600",
       backgroundColor: "bg-gray-600",
       textColor: "text-gray-700",
       chipBackgroundColor: "bg-gray-200",
    },
    default: {
       borderColor: "",
       backgroundColor: "bg-gray-500",
       textColor: "text-gray-700",
       chipBackgroundColor: "bg-gray-200",
    },
 };
 export const StatusIcon = {
   completed: "/assets/icons/check.svg",
   pending: "/assets/icons/pending.svg",
   failed: "/assets/icons/cancelled.svg",
 };
 

 export function formatDate(dateString: string) {
   const date = new Date(dateString);

   const year = date.getFullYear();
   const month = String(date.getMonth() + 1).padStart(2, '0'); 
   const day = String(date.getDate()).padStart(2, '0');
   const hours = String(date.getHours()).padStart(2, '0');
   const minutes = String(date.getMinutes()).padStart(2, '0');
   const seconds = String(date.getSeconds()).padStart(2, '0');

   return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

