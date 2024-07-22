"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaSearch, FaBars } from "react-icons/fa";
import { Button } from "./ui/button";

interface SearchResult {
  id: string;
  content: string;
  type: string;
  url: string;
}

const DocsNavbar = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const router = useRouter();

  const fetchSearchResults = async (query: string) => {
    try {
      const response = await fetch(`/api/search?query=${query}`);
      if (response.ok) {
        const results: SearchResult[] = await response.json();
        setSearchResults(
          results.filter((result) => result.type === "page")
        );
      } else {
        console.error(
          "Error fetching search results:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  useEffect(() => {
    if (searchQuery.length >= 3) {
      fetchSearchResults(searchQuery);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchResults.length > 0) {
      router.push(searchResults[0].url);
      setSearchResults([]);
      setSearchQuery("");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="h-[90px] fixed left-0 top-0 w-full z-[50] bg-background shadow-md">
      <div className="container mx-auto p-4 flex items-center justify-between">
        <Link href="/api-docs/start/introduction">API-DOCS</Link>

        <div className="flex items-center gap-10">
          <form
            onSubmit={handleSearch}
            className="bg-transparent p-2 rounded-md w-[200px] md:w-[300px] lg:w-[400px] border border-main docform"
          >
            <FaSearch className="text-main mx-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="outline-none w-5/6 bg-transparent"
              placeholder="Search..."
            />
          </form>
          <div className="docnav">
            <Link href="/api-docs/start/introduction">API</Link>
            <Link href="/help-center">Support</Link>
            <Link href="/login">
              <Button className="bg-main">Sign in</Button>
            </Link>
          </div>
          <button
            className="md:hidden text-main"
            onClick={toggleMenu}
          >
            <FaBars size={20} />
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-background shadow-lg p-10 absolute top-[90px] right-0 w-fit">
          <div className="flex flex-col gap-4">
            <Link
              href="#"
              onClick={() => setIsMenuOpen(false)}
            >
              API
            </Link>
            <Link
              href="/help-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Support
            </Link>
            <Link
              href="/login"
              onClick={() => setIsMenuOpen(false)}
            >
              <Button className="bg-main w-full">Sign in</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocsNavbar;
