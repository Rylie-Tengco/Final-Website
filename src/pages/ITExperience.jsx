import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useState } from 'react';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  color: #1E3D59;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3),
               0 0 10px rgba(255, 255, 255, 0.5),
               0 0 20px rgba(255, 255, 255, 0.3);
`;

const ExperienceContainer = styled.div`
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
`;

const ExperienceCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CompanyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const CompanyName = styled.h3`
  color: #1A1B2F;
  font-size: 1.5rem;
  margin: 0;
`;

const Duration = styled.span`
  color: #2A9D8F;
  font-weight: 500;
`;

const Role = styled.h4`
  color: #1A1B2F;
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const TechStack = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const TechTag = styled.span`
  background: #E9C46A;
  color: #1A1B2F;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: 500;
`;

const Details = styled(motion.div)`
  margin-top: 1rem;
  color: #1A1B2F;
  line-height: 1.6;
`;

const Responsibilities = styled.ul`
  padding-left: 1.5rem;
  margin-top: 1rem;
`;

const Responsibility = styled.li`
  margin-bottom: 0.5rem;
  color: #1A1B2F;
`;

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

function ITExperience() {
  const [expandedId, setExpandedId] = useState(null);

  const experiences = [
    {
      id: 1,
      company: "Tech Solutions Inc.",
      duration: "2022 - Present",
      role: "Senior Full Stack Developer",
      techStack: ["React", "Node.js", "PostgreSQL", "AWS", "Docker"],
      responsibilities: [
        "Led development of enterprise-scale web applications",
        "Mentored junior developers and conducted code reviews",
        "Implemented CI/CD pipelines and automated testing",
        "Optimized application performance and reduced loading times by 40%"
      ]
    },
    {
      id: 2,
      company: "Digital Innovations",
      duration: "2020 - 2022",
      role: "Frontend Developer",
      techStack: ["React", "TypeScript", "Redux", "Material-UI", "Jest"],
      responsibilities: [
        "Developed responsive web applications using React",
        "Implemented state management solutions using Redux",
        "Created reusable component libraries",
        "Collaborated with UX designers to implement pixel-perfect designs"
      ]
    },
    {
      id: 3,
      company: "StartUp Solutions",
      duration: "2019 - 2020",
      role: "Junior Developer",
      techStack: ["JavaScript", "HTML", "CSS", "jQuery", "Bootstrap"],
      responsibilities: [
        "Built and maintained client websites",
        "Implemented responsive designs",
        "Optimized website performance",
        "Assisted in bug fixing and feature implementation"
      ]
    }
  ];

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      transition={{ duration: 0.3 }}
    >
      <PageContainer>
        <Title>IT Experience</Title>
        <ExperienceContainer>
          {experiences.map((exp) => (
            <ExperienceCard
              key={exp.id}
              onClick={() => toggleExpand(exp.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: exp.id * 0.1 }}
            >
              <CompanyHeader>
                <CompanyName>{exp.company}</CompanyName>
                <Duration>{exp.duration}</Duration>
              </CompanyHeader>
              <Role>{exp.role}</Role>
              <TechStack>
                {exp.techStack.map((tech) => (
                  <TechTag key={tech}>{tech}</TechTag>
                ))}
              </TechStack>
              <Details
                initial="collapsed"
                animate={expandedId === exp.id ? "expanded" : "collapsed"}
                variants={{
                  expanded: { opacity: 1, height: "auto" },
                  collapsed: { opacity: 0, height: 0 }
                }}
                transition={{ duration: 0.3 }}
              >
                <Responsibilities>
                  {exp.responsibilities.map((resp, index) => (
                    <Responsibility key={index}>{resp}</Responsibility>
                  ))}
                </Responsibilities>
              </Details>
            </ExperienceCard>
          ))}
        </ExperienceContainer>
      </PageContainer>
    </motion.div>
  );
}

export default ITExperience;
