"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { getApplications } from "@/lib/api";
import { Application } from "@/types";
import Link from "next/link";
import styled from "styled-components";
import Spinner from "@/components/Spinner";
import { showToast } from "@/components/ToastNotification";
import Message from "@/components/Message";

export default function ApplicationsPage() {
  const t = useTranslations();
  const locale = useLocale();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await getApplications();
        const filteredApplications = response.filter(app => app.applicants.length > 0);
        const sortedApplications = filteredApplications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setApplications(sortedApplications);
      } catch (err) {
        showToast(`${t("failed_to_load")} - ${err}`, "error");
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, [t]);

  if (loading) return <Spinner />;

  return (
    <Container>
      <Title>{t("applications_title")}</Title>
      {applications.length > 0
        ? <Grid>
          {applications.map((app) => (
            <Card key={app.id}>
              <CreatedAt>
                {t("created_at")}: {new Date(app.createdAt).toLocaleDateString(locale, { year: 'numeric', month: 'short', day: '2-digit' })}
              </CreatedAt>
              <AppId>{t("application_id")}: {app.id}</AppId>
              <StyledLink href={`/${locale}/apply?id=${app.id}`}>{t("edit_application")}</StyledLink>
            </Card>
          ))}
        </Grid>
        : <Message>{t("no_applications_message")}</Message>
      }
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #ddd;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
`;

const Card = styled.div`
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 8px;
  background: #fff;
`;

const AppId = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
`;

const StyledLink = styled(Link)`
  color: #007bff;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const CreatedAt = styled.p`
  font-size: 12px;
  color: #999;
  margin-bottom: 8px;
`;
