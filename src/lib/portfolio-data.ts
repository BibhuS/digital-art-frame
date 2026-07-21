export type Project = {
  slug: string;
  title: string;
  client: string;
  tag: string;
  tech: string[];
  body: string;
  role: string;
  period: string;
  highlights: string[];
  stack: string[];
  outcome: string[];
};

export const PROJECTS: Project[] = [
  {
    slug: "oskar-client-onboarding",
    title: "OSKAR — Client Onboarding Analytics",
    client: "JP Morgan Chase",
    tag: "Databricks · Medallion · AWS",
    tech: ["Databricks", "PySpark", "AWS", "Delta Lake", "NiFi"],
    body: "Reengineered legacy ETL onto Databricks with Bronze/Silver/Gold Delta layers, hybrid pipelines for restricted geographies, and Python-based reconciliation across source and lakehouse.",
    role: "Software Engineer III — Data Engineering",
    period: "2024 — Present",
    highlights: [
      "Migrated 60+ legacy ETL workflows to Databricks Medallion on AWS with zero downtime cutover.",
      "Designed hybrid Databricks + Apache NiFi pipelines that mask PI attributes for restricted-country data before landing in the lake.",
      "Built a Python reconciliation framework validating row counts and PK consistency across source, bronze and silver.",
    ],
    stack: ["Databricks", "PySpark", "Delta Lake", "AWS S3", "Apache NiFi", "Python", "GitHub Actions"],
    outcome: [
      "Pipeline SLA breaches down 80% quarter-over-quarter",
      "Onboarding data available to analysts in T+1 instead of T+3",
    ],
  },
  {
    slug: "investment-banking-datamart",
    title: "Investment Banking Datamart",
    client: "Barclays",
    tag: "AWS Glue · Step Functions · Redshift",
    tech: ["AWS", "PySpark", "Redshift", "Terraform"],
    body: "PySpark pipelines on Glue orchestrated by Step Functions with DynamoDB metadata. CloudFormation-driven infra, Lambda + EventBridge automation, curated Redshift marts feeding dashboards.",
    role: "Consultant — Data Engineering",
    period: "2022 — 2024",
    highlights: [
      "Built a metadata-driven Glue-PySpark framework where new sources are onboarded by config, not code.",
      "Orchestrated end-to-end with Step Functions and a DynamoDB job registry for retries and idempotency.",
      "Automated S3-event ingestion via Lambda + EventBridge with unzip, checksum and scheduled downstream triggers.",
    ],
    stack: ["AWS Glue", "PySpark", "Step Functions", "DynamoDB", "Redshift", "Lambda", "CloudFormation"],
    outcome: [
      "20+ IB datasets landed into Redshift powering trader-facing dashboards",
      "New source onboarding time reduced from weeks to hours",
    ],
  },
  {
    slug: "insurance-lakehouse-databricks",
    title: "Insurance Lakehouse on Databricks",
    client: "Travelers Insurance",
    tag: "PySpark · Databricks · Athena",
    tech: ["Databricks", "PySpark", "AWS", "Terraform"],
    body: "SIP ingestion landing to S3, parsed via PySpark on Databricks into Glue tables queried through Athena. CI/CD via Jenkins with Terraform orchestration.",
    role: "Specialist — Data Engineering",
    period: "2020 — 2022",
    highlights: [
      "Built SIP-based ingestion into S3 and structured parsing on Databricks producing Glue-catalogued tables.",
      "Terraform-orchestrated Jenkins pipelines triggering PySpark jobs across environments.",
      "Owned P1 production support for critical client SIP jobs during business hours.",
    ],
    stack: ["Databricks", "PySpark", "AWS S3", "AWS Glue", "Athena", "Jenkins", "Terraform"],
    outcome: [
      "Ingestion reliability improved to 99.9% over rolling 90 days",
      "Analyst self-service via Athena eliminated ad-hoc data pulls",
    ],
  },
  {
    slug: "iot-streaming-platform",
    title: "IoT Streaming Platform",
    client: "MITIE Mozaic",
    tag: "Streamsets · Kafka · Python API",
    tech: ["Kafka", "Streaming", "Python"],
    body: "End-to-end IoT streaming from sensors through Streamsets into Kafka, with Python REST APIs powering user dashboards and re-processing tooling for missed data.",
    role: "Technical Lead — Big Data",
    period: "2018 — 2020",
    highlights: [
      "Streamsets pipelines fanning sensor telemetry into Kafka with schema enforcement.",
      "Python REST APIs exposing near-real-time metrics to customer dashboards.",
      "Reprocessing scripts to recover missed Kafka windows without duplicates.",
    ],
    stack: ["Apache Kafka", "Streamsets", "Python", "REST", "Cloudera"],
    outcome: [
      "Sub-minute freshness on operational dashboards",
      "Zero data loss on 3 major broker incidents thanks to replay tooling",
    ],
  },
  {
    slug: "airline-realtime-pipeline",
    title: "Real-time Airline Data Pipeline",
    client: "Sabre",
    tag: "Spark Streaming · Scala · Oozie",
    tech: ["Spark", "Kafka", "Scala", "Streaming"],
    body: "Spark Streaming consumer on Kafka Direct API, custom Flume EBCDIC→ASCII interceptor, and Oozie Coordinators/Bundles automating batch and streaming across the Hadoop cluster.",
    role: "Associate — Big Data",
    period: "2016 — 2018",
    highlights: [
      "Kafka Direct API consumer with exactly-once semantics via manual offset commits.",
      "Custom Flume interceptor translating mainframe EBCDIC records to ASCII on ingest.",
      "Oozie Coordinators + Bundles automating the full batch/streaming schedule.",
    ],
    stack: ["Apache Spark", "Kafka", "Scala", "Flume", "Oozie", "HDFS", "Hive"],
    outcome: [
      "Reservation events processed in under 30 seconds end-to-end",
      "Mainframe migration unblocked without touching the source system",
    ],
  },
  {
    slug: "transactional-text-analytics",
    title: "Transactional Text Analytics",
    client: "Sabre @ Dell",
    tag: "Sqoop · UIMA · HBase",
    tech: ["Hadoop", "Java", "HBase"],
    body: "Sqoop ingestion from SQL Server to HDFS, Apache UIMA + Java annotation, HBase JSON store feeding pattern mining, rule engine, predictive scoring and offer rotation.",
    role: "Software Dev Analyst",
    period: "2013 — 2016",
    highlights: [
      "Sqoop-based CDC from SQL Server into HDFS with delta reconciliation.",
      "Java + Apache UIMA annotators extracting entities from transactional text.",
      "HBase JSON store powering pattern mining, rule engine and predictive scoring.",
    ],
    stack: ["Sqoop", "HDFS", "Apache UIMA", "Java", "HBase", "MapReduce"],
    outcome: [
      "Two-time Dell 'On the Spot' award recipient",
      "Model-scored offers lifted campaign response rate 12%",
    ],
  },
];

export const PROJECT_TECH_FILTERS = [
  "All",
  "Databricks",
  "AWS",
  "PySpark",
  "Spark",
  "Kafka",
  "Streaming",
  "Scala",
  "Python",
];

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  date: string;
  readingMinutes: number;
  body: string; // simple markdown-ish paragraphs separated by \n\n; ## headings supported
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "medallion-in-real-life",
    title: "The Medallion Architecture, in Real Life",
    excerpt:
      "Bronze/Silver/Gold is a poster on the wall until you're on-call at 2am. Here's how I actually structure Databricks layers, ownership, and retries in production.",
    tag: "Databricks",
    date: "2026-05-12",
    readingMinutes: 7,
    body:
      "The Medallion architecture — Bronze, Silver, Gold — is one of those diagrams every data team pins to a Miro board and then quietly ignores. In production it needs to answer three unglamorous questions: who owns each layer, what happens on failure, and where does back-pressure live.\n\n## Bronze is boring on purpose\n\nBronze is raw, append-only, schema-on-read. It exists so you can rewind. If your Bronze layer has business logic in it, you don't have Bronze — you have a very sad Silver. The best Bronze pipelines I've built do exactly two things: land the payload, and stamp ingestion metadata (source, batch id, wall clock).\n\n## Silver is where the pain lives\n\nSilver is where records are cleaned, deduplicated and conformed. It's also where most of your incidents will originate, because Silver is the first place business rules touch data. Two things make Silver survivable:\n\n- Idempotent MERGE. Not overwrite, not append. MERGE keyed on the natural business key with an ingestion timestamp tiebreaker.\n- A reconciliation job that runs after every batch and compares Bronze row counts and PK sets to Silver. No dashboard, just a red/green.\n\n## Gold is a product\n\nGold tables are consumed by dashboards, models, or APIs. That means Gold has an SLA, an owner, and a schema contract. Treating Gold like a product — with backwards-compatible migrations and deprecation windows — is the single biggest lift for downstream trust.\n\n## The rule I keep coming back to\n\nIf a tired on-call engineer at 3am can't figure out which layer to look at first, your architecture isn't a Medallion, it's a mood board.",
  },
  {
    slug: "step-functions-vs-airflow",
    title: "Step Functions vs Airflow for Data Pipelines",
    excerpt:
      "Two orchestrators, two very different philosophies. When I reach for AWS Step Functions, when I reach for Airflow, and the honest trade-offs.",
    tag: "AWS",
    date: "2026-03-04",
    readingMinutes: 6,
    body:
      "Both tools schedule work. That's where the similarity ends.\n\n## Step Functions is a state machine\n\nIt shines when the pipeline is a graph of AWS-native tasks — Lambda, Glue, ECS, EMR. Retries, timeouts and error branches are declarative in the ASL JSON, and the console visualiser is genuinely useful during an incident.\n\n## Airflow is a Python DAG\n\nIt shines when the pipeline is a graph of *heterogeneous* systems — a Databricks job, a REST API call, an SFTP drop, a Snowflake query. Because tasks are Python operators, integration is a `pip install` away.\n\n## How I actually choose\n\n- If ≥80% of the tasks are AWS-native and the team is comfortable with IaC: Step Functions.\n- If the pipeline spans clouds, SaaS, or bespoke systems: Airflow (or Managed Airflow).\n- Never both in the same repo. That way lies madness and two on-call rotations.",
  },
  {
    slug: "pyspark-performance-checklist",
    title: "A PySpark Performance Checklist I Actually Use",
    excerpt:
      "Skew, shuffles, broadcasts, AQE — the five things I check before touching cluster size when a PySpark job is slow.",
    tag: "PySpark",
    date: "2026-01-22",
    readingMinutes: 5,
    body:
      "When a PySpark job gets slow, the reflex is to add nodes. Don't. Walk this checklist first.\n\n## 1. Look at the stage that's slow, not the job\n\nOpen the Spark UI, find the longest stage, and read the task distribution histogram. If one task is 10× the others, you have skew, not a capacity problem.\n\n## 2. Broadcast the small side\n\nAny join where one side fits in memory of a single executor should be a broadcast join. Trust `autoBroadcastJoinThreshold` less than you'd think; hint it explicitly.\n\n## 3. Enable AQE\n\nAdaptive Query Execution handles skew and coalesces shuffle partitions at runtime. On modern Spark it's a nearly free win. `spark.sql.adaptive.enabled=true`.\n\n## 4. Avoid `collect()`\n\nEvery `collect()` on non-trivial data is a foot-gun. Replace with `toLocalIterator()`, aggregations, or writing to storage.\n\n## 5. Cache once, cache deliberately\n\nCaching a DataFrame you use once is worse than not caching. Cache only what you re-scan, and unpersist when done.",
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export const SOCIAL = {
  email: "bibhuhadoop2016@gmail.com",
  phone: "+447867211118",
  phoneDisplay: "+44 7867 211118",
  github: "https://github.com/BibhuS",
  linkedin: "https://www.linkedin.com/in/bibhu-bhushan-sinha/",
};

// Served from /public so it works on GitHub Pages (subpath) and Lovable preview.
export const RESUME_URL = `${import.meta.env.BASE_URL}Bibhu_Bhushan_Sinha_Resume.pdf`;