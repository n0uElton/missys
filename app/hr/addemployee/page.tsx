"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { AppSidebar } from "@/components/app-sidebar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { supabase } from "@/supabaseClient";
import { Dialog } from "@headlessui/react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";

export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    employee_id: "",
    full_name: "",
    date_of_birth: "",
    gender: "",
    photo_url: "",
    email: "",
    phone_number: "",
    street_address: "",
    city: "",
    state: "",
    zip_code: "",
    job_title: "",
    department: "",
    date_of_joining: "",
    work_location: "",
    salary: "",
    fifteen_thirty_a_month: "",
    bank_account: "",
    tax_code: "",
    benefits: "",
    sss_number: "",
    philhealth_number: "",
    pagibig_number: "",
    emergency_contact_name: "",
    emergency_contact_number: "",
    reporting_manager: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<typeof formData>>({});

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/");
        return;
      }

      const user = session.user;
      setUser(user);

      const { data, error } = await supabase
        .from("profiles")
        .select("name")
        .eq("id", user.id)
        .single();

      if (error || !data) {
        console.error(
          "Error fetching username:",
          error?.message || "No user data found"
        );
        setUsername(null);
        toast.error("Failed to fetch username", {
          description: "Please try again later.",
        });
      } else {
        setUsername(data.name);
        toast.message(
          <div className="text-center">Welcome, {data.name || "User"}</div>
        );
      }

      setLoading(false);
    };

    checkUser();
  }, [router]);

  const mockEmployees = [
    {
      employee_id: "1",
      full_name: "John Doe",
      email: "john.doe@example.com",
      phone_number: "123-456-7890",
      department: "Finance",
      job_title: "Accountant",
      date_of_joining: "2021-06-15",
    },
  ];

  const steps = [
    "Personal Information",
    "Contact Information",
    "Employment Details",
    "Additional Information",
    "Emergency Contact",
  ];

  const validateForm = () => {
    const errors: Partial<typeof formData> = {};
    if (currentStep === 0) {
      if (!formData.full_name) errors.full_name = "Full Name is required";
      if (!formData.date_of_birth)
        errors.date_of_birth = "Date of Birth is required";
      if (!formData.gender) errors.gender = "Gender is required";
      if (!formData.employee_id) errors.employee_id = "Employee ID is required";
    } else if (currentStep === 1) {
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
        errors.email = "Valid email is required";
      if (!formData.phone_number)
        errors.phone_number = "Phone Number is required";
    } else if (currentStep === 2) {
      if (!formData.job_title) errors.job_title = "Job Title is required";
      if (!formData.department) errors.department = "Department is required";
      if (!formData.date_of_joining)
        errors.date_of_joining = "Date of Joining is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (validateForm() && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setFormErrors({});
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setFormErrors({});
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setIsModalOpen(false);
      setCurrentStep(0);
      toast.success("Employee added (UI only)");
      setFormData({
        employee_id: "",
        full_name: "",
        date_of_birth: "",
        gender: "",
        photo_url: "",
        email: "",
        phone_number: "",
        street_address: "",
        city: "",
        state: "",
        zip_code: "",
        job_title: "",
        department: "",
        date_of_joining: "",
        work_location: "",
        salary: "",
        fifteen_thirty_a_month: "",
        bank_account: "",
        tax_code: "",
        benefits: "",
        sss_number: "",
        philhealth_number: "",
        pagibig_number: "",
        emergency_contact_name: "",
        emergency_contact_number: "",
        reporting_manager: "",
      });
    }
  };

  const handleAction = (
    action: string,
    employee: (typeof mockEmployees)[0]
  ) => {
    switch (action) {
      case "view":
        toast.info(`Viewing info for ${employee.full_name}`);
        break;
      case "edit":
        toast.info(`Editing ${employee.full_name}`);
        setFormData({
          ...employee,
          date_of_birth: "",
          gender: "",
          photo_url: "",
          street_address: "",
          city: "",
          state: "",
          zip_code: "",
          work_location: "",
          salary: "",
          fifteen_thirty_a_month: "",
          bank_account: "",
          tax_code: "",
          benefits: "",
          sss_number: "",
          philhealth_number: "",
          pagibig_number: "",
          emergency_contact_name: "",
          emergency_contact_number: "",
          reporting_manager: "",
        });
        setIsModalOpen(true);
        break;
      case "delete":
        toast.success(`Deleted ${employee.full_name} (UI only)`);
        break;
    }
  };

  return (
    <SidebarProvider>
      <Toaster position="top-center" />
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center gap-2 px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Employee Info</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Employee Information</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              + Add Employee
            </button>
          </div>

          {/* Employee Table */}
          <div className="border rounded-lg shadow-sm bg-white">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 font-medium">ID</th>
                  <th className="px-4 py-3 font-medium">Full Name</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Phone</th>
                  <th className="px-4 py-3 font-medium">Department</th>
                  <th className="px-4 py-3 font-medium">Job Title</th>
                  <th className="px-4 py-3 font-medium">Date Joined</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockEmployees.map((emp) => (
                  <tr
                    key={emp.employee_id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">{emp.employee_id}</td>
                    <td className="px-4 py-3">{emp.full_name}</td>
                    <td className="px-4 py-3">{emp.email}</td>
                    <td className="px-4 py-3">{emp.phone_number}</td>
                    <td className="px-4 py-3">{emp.department}</td>
                    <td className="px-4 py-3">{emp.job_title}</td>
                    <td className="px-4 py-3">{emp.date_of_joining}</td>
                    <td className="px-4 py-3">
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <Menu.Button className="p-1 rounded-full hover:bg-gray-200">
                          <EllipsisVerticalIcon className="h-5 w-5" />
                        </Menu.Button>
                        <Transition
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white border rounded-md shadow-lg max-h-40 overflow-y-auto z-50">
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => handleAction("view", emp)}
                                    className={`${
                                      active ? "bg-gray-100" : ""
                                    } block w-full text-left px-4 py-2 text-sm`}
                                  >
                                    View Info
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => handleAction("edit", emp)}
                                    className={`${
                                      active ? "bg-gray-100" : ""
                                    } block w-full text-left px-4 py-2 text-sm`}
                                  >
                                    Edit
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => handleAction("delete", emp)}
                                    className={`${
                                      active
                                        ? "bg-gray-100 text-red-600"
                                        : "text-red-600"
                                    } block w-full text-left px-4 py-2 text-sm`}
                                  >
                                    Delete
                                  </button>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Employee Modal */}
        <Dialog
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          className="relative z-50"
        >
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            aria-hidden="true"
          />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-4xl bg-white rounded-lg p-8 shadow-xl max-h-[90vh] overflow-y-auto">
              <Dialog.Title className="text-2xl font-bold text-gray-900 mb-6">
                {formData.employee_id ? "Edit Employee" : "Add New Employee"}
              </Dialog.Title>

              {/* Stepper Navigation */}
              <div className="flex justify-between mb-6">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex-1 text-center py-2 ${
                      index === currentStep
                        ? "border-b-2 border-blue-600 text-blue-600"
                        : "text-gray-500"
                    }`}
                  >
                    {step}
                  </div>
                ))}
              </div>

              <form className="space-y-6">
                {currentStep === 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full border rounded-md p-3 focus:ring-2 focus:ring-blue-500 ${
                          formErrors.full_name
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Full Name"
                      />
                      {formErrors.full_name && (
                        <p className="mt-1 text-sm text-red-500">
                          {formErrors.full_name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Employee ID
                      </label>
                      <input
                        name="employee_id"
                        value={formData.employee_id}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full border rounded-md p-3 focus:ring-2 focus:ring-blue-500 ${
                          formErrors.employee_id
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Enter Employee ID"
                      />
                      {formErrors.employee_id && (
                        <p className="mt-1 text-sm text-red-500">
                          {formErrors.employee_id}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Date of Birth
                      </label>
                      <input
                        name="date_of_birth"
                        type="date"
                        value={formData.date_of_birth}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full border rounded-md p-3 focus:ring-2 focus:ring-blue-500 ${
                          formErrors.date_of_birth
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {formErrors.date_of_birth && (
                        <p className="mt-1 text-sm text-red-500">
                          {formErrors.date_of_birth}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Gender
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full border rounded-md p-3 focus:ring-2 focus:ring-blue-500 ${
                          formErrors.gender
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      {formErrors.gender && (
                        <p className="mt-1 text-sm text-red-500">
                          {formErrors.gender}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Photo URL (optional)
                      </label>
                      <input
                        name="photo_url"
                        value={formData.photo_url}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500"
                        placeholder="Photo URL"
                      />
                    </div>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full border rounded-md p-3 focus:ring-2 focus:ring-blue-500 ${
                          formErrors.email
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Email"
                      />
                      {formErrors.email && (
                        <p className="mt-1 text-sm text-red-500">
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <input
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full border rounded-md p-3 focus:ring-2 focus:ring-blue-500 ${
                          formErrors.phone_number
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Phone Number"
                      />
                      {formErrors.phone_number && (
                        <p className="mt-1 text-sm text-red-500">
                          {formErrors.phone_number}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Street Address
                      </label>
                      <input
                        name="street_address"
                        value={formData.street_address}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500"
                        placeholder="Street Address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <input
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500"
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        State
                      </label>
                      <input
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500"
                        placeholder="State"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        ZIP / Postal Code
                      </label>
                      <input
                        name="zip_code"
                        value={formData.zip_code}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500"
                        placeholder="ZIP / Postal Code"
                      />
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Job Title / Position
                      </label>
                      <input
                        name="job_title"
                        value={formData.job_title}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full border rounded-md p-3 focus:ring-2 focus:ring-blue-500 ${
                          formErrors.job_title
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Job Title"
                      />
                      {formErrors.job_title && (
                        <p className="mt-1 text-sm text-red-500">
                          {formErrors.job_title}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Department
                      </label>
                      <input
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full border rounded-md p-3 focus:ring-2 focus:ring-blue-500 ${
                          formErrors.department
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Department"
                      />
                      {formErrors.department && (
                        <p className="mt-1 text-sm text-red-500">
                          {formErrors.department}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Date of Joining
                      </label>
                      <input
                        name="date_of_joining"
                        type="date"
                        value={formData.date_of_joining}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full border rounded-md p-3 focus:ring-2 focus:ring-blue-500 ${
                          formErrors.date_of_joining
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Date of Joining"
                      />
                      {formErrors.date_of_joining && (
                        <p className="mt-1 text-sm text-red-500">
                          {formErrors.date_of_joining}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Work Location
                      </label>
                      <input
                        name="work_location"
                        value={formData.work_location}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500"
                        placeholder="Work Location"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Salary / Hourly Rate
                      </label>
                      <input
                        name="salary"
                        value={formData.salary}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500"
                        placeholder="Salary / Hourly Rate"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Payment Frequency
                      </label>
                      <input
                        name="fifteen_thirty_a_month"
                        value={formData.fifteen_thirty_a_month}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Payment Frequency"
                      />
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Bank Account Details
                      </label>
                      <input
                        name="bank_account"
                        value={formData.bank_account}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500"
                        placeholder="Bank Account Details"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Tax Code / PAN / TIN
                      </label>
                      <input
                        name="tax_code"
                        value={formData.tax_code}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500"
                        placeholder="Tax Code / PAN / TIN"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Benefits / Deductions
                      </label>
                      <input
                        name="benefits"
                        value={formData.benefits}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500"
                        placeholder="Benefits / Deductions"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        SSS Number
                      </label>
                      <input
                        name="sss_number"
                        value={formData.sss_number}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500"
                        placeholder="SSS Number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        PhilHealth Number
                      </label>
                      <input
                        name="philhealth_number"
                        value={formData.philhealth_number}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500"
                        placeholder="PhilHealth Number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Pag-IBIG Number
                      </label>
                      <input
                        name="pagibig_number"
                        value={formData.pagibig_number}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500"
                        placeholder="Pag-IBIG Number"
                      />
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Emergency Contact Name
                      </label>
                      <input
                        name="emergency_contact_name"
                        value={formData.emergency_contact_name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500"
                        placeholder="Emergency Contact Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Emergency Contact Number
                      </label>
                      <input
                        name="emergency_contact_number"
                        value={formData.emergency_contact_number}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500"
                        placeholder="Emergency Contact Number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Reporting Manager
                      </label>
                      <input
                        name="reporting_manager"
                        value={formData.reporting_manager}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500"
                        placeholder="Reporting Manager"
                      />
                    </div>
                  </div>
                )}
              </form>

              <div className="mt-8 flex justify-between gap-3">
                <div>
                  {currentStep > 0 && (
                    <button
                      onClick={handlePrevious}
                      className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Previous
                    </button>
                  )}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setCurrentStep(0);
                    }}
                    className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  {currentStep < steps.length - 1 ? (
                    <button
                      onClick={handleNext}
                      className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {formData.employee_id ? "Add Employee" : "Save Employee"}
                    </button>
                  )}
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </SidebarInset>
    </SidebarProvider>
  );
}
