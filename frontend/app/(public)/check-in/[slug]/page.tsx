'use client'

import PaidUserForm from "@/components/forms/paidUserForm";
import PresenterForm from "@/components/forms/presenterForm";
import StudentForm from "@/components/forms/studentForm";

export default function Page({ params }: { params: { slug: string } }) {
  const renderForm = (): JSX.Element => {
    switch (params.slug) {
      case 'presenter':
        return <PresenterForm role="Presenter" />;
      case 'paid-user':
        return <PaidUserForm role="Paid User" />;
      case 'student':
        return <StudentForm role="Student" />;
      default:
        return <div>My Post: {params.slug}</div>;
    }
  };

  return <div className="px-10">{renderForm()}</div>;
}