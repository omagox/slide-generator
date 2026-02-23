from pydantic import BaseModel, Field
from typing import List, Optional, Literal, Any

# Base Models matching frontend/src/templates/types.tsx

class SingleTopic(BaseModel):
    title: str = Field(..., description="Título do slide")
    content: str = Field(..., description="Conteúdo principal")

class TopicContent(BaseModel):
    title: str
    content: str

class TwoTopics(BaseModel):
    title: str
    topics: List[TopicContent] = Field(..., min_items=2, max_items=2)

class MultipleTopics(BaseModel):
    title: str
    topics: List[str]

class TopicWithSubtopics(BaseModel):
    title: str
    subtopics: List[str]

class TopicsWithSubtopics(BaseModel):
    title: str
    topics: List[TopicWithSubtopics]

class TopicDetails(BaseModel):
    title: str
    content: str
    details: List[str]

class TopicWithDetails(BaseModel):
    title: str
    topic: TopicDetails

class MixedContent(BaseModel):
    title: str
    topics: List[str]
    content: Optional[str] = None

class DetailedTopic(BaseModel):
    title: str
    content: str
    additional: Optional[str] = None

class DetailedTopics(BaseModel):
    title: str
    topics: List[DetailedTopic]

class TimelineStep(BaseModel):
    title: str
    description: str

class Timeline(BaseModel):
    title: str
    steps: List[TimelineStep]
    content: Optional[str] = None

class TableRow(BaseModel):
    topic: str
    details: str

class Table(BaseModel):
    title: str
    rows: List[TableRow]

class CircularItem(BaseModel):
    title: str
    description: Optional[str] = None

class Circular(BaseModel):
    title: str
    items: List[CircularItem]

class HighlightTopic(BaseModel):
    title: str
    content: str
    highlight: Optional[str] = None

class Highlight(BaseModel):
    title: str
    topic: HighlightTopic

class ProcessStep(BaseModel):
    title: str
    content: str
    additional: Optional[str] = None

class Process(BaseModel):
    title: str
    steps: List[ProcessStep]

class LearningObjectives(BaseModel):
    title: str
    objectives: List[str]

class Definition(BaseModel):
    title: str
    term: str
    definition: str
    examples: Optional[List[str]] = None

class ExampleItem(BaseModel):
    title: str
    description: str

class Example(BaseModel):
    title: str
    concept: str
    examples: List[ExampleItem]

class ComparisonItem(BaseModel):
    title: str
    characteristics: List[str]

class Comparison(BaseModel):
    title: str
    items: List[ComparisonItem]

class CaseStudy(BaseModel):
    title: str
    scenario: str
    questions: List[str]

class FormulaVariable(BaseModel):
    symbol: str
    meaning: str

class Formula(BaseModel):
    title: str
    formula: str
    variables: List[FormulaVariable]
    example: Optional[str] = None

class Quiz(BaseModel):
    title: str
    question: str
    options: List[str]
    correctAnswer: Optional[int] = None

class Agenda(BaseModel):
    title: str
    topics: List[str]

class Reference(BaseModel):
    author: str
    title: str
    year: str
    source: Optional[str] = None

class Bibliography(BaseModel):
    title: str
    references: List[Reference]

class KeyPoint(BaseModel):
    title: str
    description: str
    importance: Literal["high", "medium", "low"]

class KeyPoints(BaseModel):
    title: str
    points: List[KeyPoint]

class OptionalQuestion(BaseModel):
    statement: str
    options: List[str]

# Mapping based on grep analysis of frontend/src/templates/template-*.tsx
TEMPLATE_MODELS = {
    1: SingleTopic,
    2: TwoTopics,
    3: MultipleTopics,
    4: TopicsWithSubtopics,
    5: DetailedTopics,
    6: MultipleTopics,
    7: TwoTopics,
    8: MixedContent,
    9: Timeline,
    10: MultipleTopics,
    11: MixedContent,
    12: DetailedTopics,
    13: DetailedTopics,
    14: MixedContent,
    15: Table,
    16: Highlight,
    17: MixedContent,
    18: TwoTopics,
    19: Process,
    20: DetailedTopics,
    21: Timeline,
    22: DetailedTopics,
    23: DetailedTopics,
    24: MixedContent,
    25: TopicsWithSubtopics,
    26: Highlight,
    27: LearningObjectives,
    28: Definition,
    29: Agenda,
    30: Example,
    31: Comparison,
    32: CaseStudy,
    33: Formula,
    34: SingleTopic,
    35: Process,
    36: MultipleTopics,
    37: DetailedTopics,
    38: SingleTopic,
    39: DetailedTopics,
    40: TopicWithDetails,
    41: Process,
    42: TwoTopics,
    43: Process,
    44: TwoTopics,
    45: Example,
    46: Comparison,
    47: CaseStudy,
    50: Timeline,
    51: Process,
    52: SingleTopic,
    53: Process,
    54: OptionalQuestion,
}
