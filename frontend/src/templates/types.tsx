export interface SingleTopicProps {
  title: string
  content: string
  preview?: boolean
}

export interface TwoTopicsProps {
  title: string
  topics: {
    title: string
    content: string
  }[]
  preview?: boolean
}

export interface MultipleTopicsProps {
  title: string
  topics: string[]
  preview?: boolean
}

export interface TopicsWithSubtopicsProps {
  title: string
  topics: {
    title: string
    subtopics: string[]
  }[]
  preview?: boolean
}

export interface TopicWithDetailsProps {
  title: string
  topic: {
    title: string
    content: string
    details: string[]
  }
  preview?: boolean
}

export interface MixedContentProps {
  title: string
  topics: string[]
  content?: string
  preview?: boolean
}

export interface DetailedTopicsProps {
  title: string
  topics: {
    title: string
    content: string
    additional?: string
  }[]
  preview?: boolean
}

export interface TimelineProps {
  title: string
  steps: {
    title: string
    description: string
  }[]
  content?: string
  preview?: boolean
}

export interface TableProps {
  title: string
  rows: {
    topic: string
    details: string
  }[]
  preview?: boolean
}

export interface CircularProps {
  title: string
  items: {
    title: string
    description?: string
  }[]
  preview?: boolean
}

export interface HighlightProps {
  title: string
  topic: {
    title: string
    content: string
    highlight?: string
  }
  preview?: boolean
}

export interface ProcessProps {
  title: string
  steps: {
    title: string
    content: string
    additional?: string
  }[]
  preview?: boolean
}

export interface LearningObjectivesProps {
  title: string
  objectives: string[]
  preview?: boolean
}

export interface DefinitionProps {
  title: string
  term: string
  definition: string
  examples?: string[]
  preview?: boolean
}

export interface ExampleProps {
  title: string
  concept: string
  examples: {
    title: string
    description: string
  }[]
  preview?: boolean
}

export interface ComparisonProps {
  title: string
  items: {
    title: string
    characteristics: string[]
  }[]
  preview?: boolean
}

export interface CaseStudyProps {
  title: string
  scenario: string
  questions: string[]
  preview?: boolean
}

export interface FormulaProps {
  title: string
  formula: string
  variables: {
    symbol: string
    meaning: string
  }[]
  example?: string
  preview?: boolean
}

export interface QuizProps {
  title: string
  question: string
  options: string[]
  correctAnswer?: number
  preview?: boolean
}

export interface AgendaProps {
  title: string
  topics: string[]
  preview?: boolean
}

export interface BibliographyProps {
  title: string
  references: {
    author: string
    title: string
    year: string
    source?: string
  }[]
  preview?: boolean
}

export interface KeyPointsProps {
  title: string
  points: {
    title: string
    description: string
    importance: "high" | "medium" | "low"
  }[]
  preview?: boolean
}

export interface OptionalQuestionProps {
  statement: string;
  options: string[];
  correct_answer: number;
  preview?: boolean;
}