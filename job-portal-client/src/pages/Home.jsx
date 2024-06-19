    import { useEffect, useState } from "react";
    import Banner from "../components/Banner"
    import Card from "../components/Card";
    import Jobs from "./Jobs";
    import Sidebar from "../sidebar/Sidebar";
    import Newsletter from "../components/Newsletter";

    function Home() {
        const [selectedCategory, setSelectedCategory] = useState("");
        const [jobs, setJobs] = useState([]);
        const [isLoading, setIsLoading] = useState(true);
        const [currentPage, setCurrentPage] = useState(1);
        const itemsPerPage = 6;
        
        useEffect(() => {
            setIsLoading(true)
            fetch(`http://localhost:5000/all-jobs`).then(res => res.json()).then((data) => {
                // console.log(data);
                setJobs(data);
                setIsLoading(false)
            })
        },[]);

        // console.log(jobs); 

        const [query, setQuery] = useState("");
        const handleInputChange = (e) => {
        setQuery(e.target.value);
        }   

        // filer jobs by the title

        const filterItems = jobs.filter((job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1);
        console.log(filterItems);

        const handleChange = (e) => {
            setSelectedCategory(e.target.value)
        }

        const handleClick = (e) => {
            setSelectedCategory(e.target.value)
        }

        // calculate the index range
        const calculatePageRange = () =>  {
            const startIndex = (currentPage  - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            return {startIndex, endIndex}
        }

        // function for the next page!
        const nextPage = () => {
            if(currentPage < Math.ceil(filterItems.length / itemsPerPage)){
                setCurrentPage(currentPage + 1);
            }
        }
        
        // function for the previous page
        const prevPage = () => {
            if(currentPage > 1) {
                setCurrentPage(currentPage - 1);
            }
        }

        const filteredData = (jobs, selected, query) => {
            let filteredJobs = jobs;

            if(query) {
                filteredJobs = filteredJobs.filter((job) =>
                    job.jobTitle.toLowerCase().includes(query.toLowerCase())
                );
            }

            if (selectedCategory) {
                filteredJobs = filteredJobs.filter((job) => {
                    const selectedCategoryLower = selectedCategory.toLowerCase();
                    return (
                        (job.jobLocation && job.jobLocation.toLowerCase() === selectedCategoryLower) ||
                        (job.maxPrice && parseInt(job.maxPrice) <= parseInt(selectedCategory)) ||
                        (job.postingDate && job.postingDate >= selectedCategory) ||
                        (job.experienceLevel && job.experienceLevel.toLowerCase() === selectedCategoryLower) ||
                        (job.salaryType && job.salaryType.toLowerCase() === selectedCategoryLower) ||
                        (job.employmentType && job.employmentType.toLowerCase() === selectedCategoryLower)
                    );
                });
            }
            
            // slice the data based on current page
            const {startIndex, endIndex} = calculatePageRange();
            filteredJobs = filteredJobs.slice(startIndex, endIndex);
            return filteredJobs.map((data, i) => <Card key={i} data = {data}/>)
        }

        const result = filteredData(jobs, selectedCategory, query);

    return (
        <div>
            <Banner query = {query} handleInputChange = {handleInputChange}/>
            {/* Main content */}
            <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
                <div className="bg-white p-4 rounded">
                    <Sidebar handleChange = {handleChange} handleClick = {handleClick}/>
                </div>
                
                <div className="col-span-2 bg-white p-4 rounded">  
                    {
                        isLoading ? (<p className="font-medium">Loading.....</p>) :  result.length > 0 ? <Jobs result = {result}/> : <><h3 className="text-lg font-bold">{result.length} Jobs</h3>
                        <p>No Data Found!</p></>
                    }
                    {/* define pagination */}
                    {
                        result.length > 0 ? (
                            <div className="flex justify-center mt-4 space-x-8">
                                <button onClick={prevPage} disabled = {currentPage === 1} className="hover:underline">Previous</button>
                                <span className="mx-2">Page {currentPage} of {Math.ceil(filterItems.length / itemsPerPage)}</span>
                                <button onClick={nextPage} disabled = {currentPage === Math.ceil(filterItems.length / itemsPerPage)} className="hover:underline">Next</button>
                            </div>
                        ) : "" 
                    }
                </div>
                <div className="bg-white p-4 rounded">
                    <Newsletter/>
                    </div>

            </div>
        </div>
    )
    }

    export default Home
