"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styled from "styled-components";
import { Application, Applicant } from "@/types";
import { useProductStore } from "@/store/useProductStore";
import { getApplication, updateApplication } from "@/lib/api";
import Button from "@/components/Button";
import ProductCard from "@/components/ProductCard";
import { showToast } from "@/components/ToastNotification";
import Spinner from "@/components/Spinner";

const initialFormData: Applicant = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

export default function ApplyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const applicationId = searchParams.get("id")!;

  const { selectedProduct, clearProduct } = useProductStore();
  const [application, setApplication] = useState<Application | null>(null);
  const [formData, setFormData] = useState<Applicant>(initialFormData);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchApplication = useCallback(async () => {
    if (!applicationId) return;

    try {
      const app = await getApplication(applicationId);
      setApplication(app);
      setFormData(app.applicants[0] || initialFormData);
    } catch (error) {
      showToast(`Application not found - ${error}`, "error");
    } finally {
      setLoading(false);
    }
  }, [applicationId]);

  useEffect(() => {
    fetchApplication();
  }, [fetchApplication]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!application) return;
    setSubmitting(true);

    try {
      const updatedApplication = await updateApplication(application.id, {
        ...application,
        applicants: [{ ...formData }],
      });

      setApplication(updatedApplication);
      showToast("Applicant information saved successfully!", "success");
      router.push("/applications");
    } catch (error) {
      console.error("Failed to update application", error);
      showToast("Failed to save applicant information. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <PageContainer>
      {/* Left Sidebar: Selected Product */}
      {selectedProduct && (
        <Sidebar>
          <ProductCard
            product={selectedProduct}
            isSelected
            style={{ minHeight: "330px" }}
          />
          <Button
            variant="primary"
            onClick={() => {
              clearProduct();
              router.push("/");
            }}
          >
            Select another product
          </Button>
        </Sidebar>
      )}

      {/* Right Sidebar: Application Form */}
      <FormContainer>
        <SectionTitle>Main Applicant Information</SectionTitle>
        <form className="form" onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              required
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              disabled={loading || submitting}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              required
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              disabled={loading || submitting}
            />
          </FormGroup>

            <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              required
              type="email"
              id="email"
              name="email"
              value={formData.email}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              title="Please enter a valid email address"
              onChange={handleChange}
              disabled={loading || submitting}
            />
            </FormGroup>

            <FormGroup>
            <Label htmlFor="phone">Phone</Label>
            <Input
              required
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              pattern="^\+?[1-9]\d{1,14}$"
              title="Please enter a valid phone number"
              onChange={handleChange}
              disabled={loading || submitting}
            />
            </FormGroup>

          <FormGroup style={{ justifyContent: "flex-end" }}>
            <Button
              variant="secondary"
              onClick={() => router.push("/applications")}
              disabled={loading || submitting}
              style={{ marginRight: 16 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="submit"
              disabled={loading || submitting}
            >
              {submitting ? 'Saving...' : 'Save Applicant Info'}
            </Button>
          </FormGroup>
        </form>
      </FormContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 32px;
  padding: 32px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const Sidebar = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const FormContainer = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 32px 48px;
  max-width: 600px;
  width: 100%;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  color: #555;
  margin-bottom: 5px;
  width: 100%;

  @media (min-width: 768px) {
    width: 120px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;
