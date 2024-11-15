"use client";
import { useEffect, useState, useContext, createContext } from "react";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import PageTitle from "@/components/PageTitle";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import BlogModal from "@/components/modals/BlogModal";
import { Button } from "@/components/ui/button";
import { FaSearch } from "react-icons/fa";
import { useGetAllBlogs, useDeleteBlog } from "@/hooks/useBlog";

type Blog = {
   id: string;
   title: string;
   image: string;
   description: string;
   content: string;
};

const columns: ColumnDef<Blog>[] = [
   {
      id: "index",
      header: "#",
      cell: ({ row }) => row.index + 1,
   },
   {
      id: "image",
      header: "Image",
      cell: ({ row }) => {
         const { image } = row.original;
         return (
            <img
               src={image}
               alt="Blog"
               style={{ width: 50, height: 50, objectFit: "cover" }}
            />
         );
      },
   },
   {
      accessorKey: "title",
      header: "Title",
   },
   {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => {
         const { description } = row.original;
         return (
            <span className="truncate w-[200px] md:w-[300px] lg:w-[400px]">
               {description.split(" ").slice(0, 10).join(" ")}...
            </span>
         );
      },
   },
   {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
         const blog = row.original;
         return <ActionButtons blog={blog} />;
      },
   },
];

const ActionButtons: React.FC<{ blog: Blog }> = ({ blog }) => {
   const router = useRouter();
   const { setModalOpen, setCurrentBlog, isAdmin } = useContext(BlogsPageContext);
   const deleteBlogMutation = useDeleteBlog();

   if (!isAdmin) return null;

   const handleUpdate = () => {
      setCurrentBlog(blog);
      setModalOpen(true);
   };

   const handleDelete = async () => {
      deleteBlogMutation.mutate(blog.id, {
         onSuccess: () => {
            toast.success("Blog deleted successfully");
            router.refresh();
         },
         onError: () => {
            toast.error("Failed to delete blog");
         },
      });
   };

   return (
      <div className="flex gap-2">
         <button onClick={handleUpdate} className="text-main">
            Update
         </button>
         /
         <button onClick={handleDelete} className="text-red-500">
            Delete
         </button>
      </div>
   );
};

const BlogsPageContext = createContext<{
   setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
   setCurrentBlog: React.Dispatch<React.SetStateAction<Blog | null>>;
   isAdmin: boolean;
}>({
   setModalOpen: () => {},
   setCurrentBlog: () => {},
   isAdmin: false,
});

export default function BlogsPage() {
   const { data: blogs, isLoading, isError } = useGetAllBlogs();
   const [filteredData, setFilteredData] = useState<Blog[]>([]);
   const [isModalOpen, setModalOpen] = useState(false);
   const [currentBlog, setCurrentBlog] = useState<Blog | null>(null);
   const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
   const [searchTerm, setSearchTerm] = useState<string>('');

   useEffect(() => {
      if (blogs) {
         const filtered = blogs.filter((blog: { title: string; description: string; }) =>
            blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.description.toLowerCase().includes(searchTerm.toLowerCase())
         );
         setFilteredData(filtered);
      }
   }, [searchTerm, blogs]);

   const handleAddBlog = () => {
      setCurrentBlog(null);
      setModalOpen(true);
   };

   const handleCloseModal = () => {
      setModalOpen(false);
   };

   if (isLoading) return <p>Loading blogs...</p>;
   if (isError) return <p>Error loading blogs.</p>;

   return (
      <BlogsPageContext.Provider
         value={{ setModalOpen, setCurrentBlog }}
      >
         <div className="mb-6 flex flex-col md:flex-row md:justify-between gap-4 w-full">
            <form
               className={`flex gap-4 items-center bg-white p-[15px] rounded-lg transition-all ${
                  isInputFocused ? "border-2 border-main" : "border"
               }`}
            >
               <FaSearch color="gray" />
               <input
                  className="outline-none flex-1"
                  placeholder="Search for..."
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
            </form>
            <Button onClick={handleAddBlog} className="self-end">
               Create Blog
            </Button>
         </div>
         <div className="flex flex-col gap-5 w-full">
            <PageTitle title="Blogs" />
            <DataTable columns={columns} data={filteredData || []} title="All Blogs" />
            {isModalOpen && (
               <BlogModal
                  blog={currentBlog}
                  onClose={handleCloseModal}
                  onSuccess={handleCloseModal}
               />
            )}
         </div>
      </BlogsPageContext.Provider>
   );
}
