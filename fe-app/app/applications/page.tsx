"use client";

import { useEffect, useState } from "react";
import { getApplications } from "@/lib/api";
import { Application } from "@/types";
import Link from "next/link";
import styled from "styled-components";
import Spinner from "@/components/Spinner";
import { showToast } from "@/components/ToastNotification";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await getApplications();
        setApplications(response.filter(app => app.applicants.length > 0));
      } catch (err) {
        console.error("Failed to load applications ", err);
        showToast(`Failed to load applications - ${err}`, "error");
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  if (loading) return <Spinner />;

  return (
    <Container>
      <Title>Your Applications</Title>
      <Grid>
        {applications.map((app) => (
          <Card key={app.id}>
            <AppId>Application ID: {app.id}</AppId>
            <StyledLink href={`/apply?id=${app.id}`}>Edit Application</StyledLink>
          </Card>
        ))}
      </Grid>
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
