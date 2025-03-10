"use client";

import { useCallback, useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import styled, { css } from "styled-components";
import { Application, Applicant } from "@/types";
import { useProductStore } from "@/store/useProductStore";
import { getApplication, updateApplication } from "@/lib/api";
import Button from "@/components/Button";
import ProductCard from "@/components/ProductCard";
import { showToast } from "@/components/ToastNotification";
import Spinner from "@/components/Spinner";
import InputField from "@/components/InputField";

const initialFormData: Applicant = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

export default function ApplyPage() {
  const t = useTranslations();
  const router = useRouter();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const applicationId = searchParams.get("id")!;

  const { selectedProduct, clearProduct } = useProductStore();
  const [application, setApplication] = useState<Application | null>(null);
  const [formData, setFormData] = useState<Applicant>(initialFormData);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const fetchApplication = useCallback(async () => {
    if (!applicationId) return;

    try {
      const app = await getApplication(applicationId);
      setApplication(app);
      setFormData(app.applicants[0] || initialFormData);
    } catch (error) {
      showToast(`${t("application_not_found_message")} - ${error}`, "error");
    } finally {
      setLoading(false);
    }
  }, [applicationId, t]);

  useEffect(() => {
    fetchApplication();
  }, [fetchApplication]);

  const validateField = (name: string, value: string) => {
    let errorMessage = "";
    if (name === "firstName" || name === "lastName") {
      if (!value) {
        errorMessage = t("required_field");
      }
    } else if (name === "email") {
      const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
      if (!value) {
        errorMessage = t("required_field");
      } else if (!emailRegex.test(value)) {
        errorMessage = t("invalid_email");
      }
    } else if (name === "phone") {
      const phoneRegex = /^\+?[1-9]\d{1,14}$/;
      if (!value) {
        errorMessage = t("required_field");
      } else if (!phoneRegex.test(value)) {
        errorMessage = t("invalid_phone");
      }
    }
    return errorMessage;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const errorMessages = validateField(name, value);
    setErrors({ ...errors, [name]: errorMessages });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!application) return;
    const newErrors = Object.keys(formData).reduce((acc: { [key: string]: string }, field) => {
      const errorMessage = validateField(field, formData[field as keyof Applicant]);
      if (errorMessage) acc[field] = errorMessage;
      return acc;
    }, {} as { [key: string]: string });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setSubmitting(true);

    try {
      const updatedApplication = await updateApplication(application.id, {
        ...application,
        applicants: [{ ...formData }],
      });

      setApplication(updatedApplication);
      showToast(t("application_success"), "success");
      router.push(`/${locale}/applications`);
    } catch (error) {
      showToast(`${t("application_error")} - ${error}`, "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <PageContainer>
      {selectedProduct && (
        <Sidebar>
          <ProductCard
            isSelected
            product={selectedProduct}
            css={css`
              width: 100%;

              @media (min-width: 768px) {
                min-height: 330px;
              }
            `}
          />
          <Button
            block="true"
            variant="primary"
            onClick={() => {
              clearProduct();
              router.push(`/${locale}`);
            }}
          >
            {t("select_another_product")}
          </Button>
        </Sidebar>
      )}

      <FormContainer>
        <SectionTitle>{t("form_title")}</SectionTitle>
        <form onSubmit={handleSubmit}>
          <InputField
            type="text"
            label="first_name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            errorMessage={errors.firstName}
          />
          <InputField
            type="text"
            label="last_name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            errorMessage={errors.lastName}
          />
          <InputField
            type="email"
            label="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            errorMessage={errors.email}
          />
          <InputField
            type="tel"
            label="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            errorMessage={errors.phone}
          />

          <ButtonGroup>
            <Button
              type="reset"
              variant="secondary"
              onClick={() => router.push(`/${locale}/applications`)}
              disabled={loading || submitting}
            >
              {t("cancel")}
            </Button>
            <Button
              type="submit"
              variant="submit"
              disabled={loading || submitting}
            >
              {submitting ? t("saving") : t("save")}
            </Button>
          </ButtonGroup>
        </form>
      </FormContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 32px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const Sidebar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 768px) {
    width: 300px;
  }
`;

const FormContainer = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 32px 48px;
  width: 100%;

  @media (min-width: 768px) {
    max-width: 600px;
  }
`;

const ButtonGroup = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-direction: column-reverse;
  gap: 8px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }
`;
