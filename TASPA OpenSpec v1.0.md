# TASPA OpenSpec v1.0

**TASPA — Smart Cafeteria 운영 플랫폼**

문서 버전: v1.0 (본문 작성) · 작성일: 2026.07.09 · 이전 버전: OpenSpec v0.1 (프로젝트명 "점맘(가제)" → TASPA로 변경)

---

## 1. Product Vision

### 서비스 비전

여러 회사가 함께 이용하는 구내식당을 위한 **AI 기반 식수예측 및 운영 자동화 플랫폼**.
식당관리자가 식수를 정확하게 예측하고, 운영을 디지털화하며, 회사별 정산을 자동화할 수 있도록 지원한다.

### 해결하려는 문제

| 영역 | 현재 문제 |
|---|---|
| 식수 예측 | 경험에 의존한 예측으로 음식물 폐기 또는 조리 부족 발생, 혼잡 시간 예측 불가 |
| 부재 정보 | 휴가·재택·외근·출장 정보가 각 회사 그룹웨어(사전결재)에만 존재하여 식당에 전달되지 않거나 사람이 수기로 전달 |
| 식수 관리 | 사원증 태깅, 종이 장부 등 방식이 분산되어 데이터가 통합되지 않음 |
| 정산 | 회사별 식수 집계, 월 정산, 급여 차감 데이터 생성이 대부분 수작업 |
| 조직 변동 | 퇴사, 계열사 이동, 신규입사 등 조직도 변경을 사람이 파악해 정산에 반영 |

### 핵심 가치

1. **음식물 폐기 ZERO** — 그룹웨어 부재 데이터와 메뉴 선호도를 반영한 AI 식수예측으로 버리는 음식을 줄여 비용 절감
2. **운영 노동력 절감** — 부재 파악, 식수 집계, 회사별 정산, 조직 변동 반영을 자동화하여 사람의 반복 업무 제거
3. **데이터 기반 운영** — 태깅·투표로 실측된 메뉴 선호도, 예측 정확도 리포트, 직원 VOC로 의사결정 지원

## 2. Personas

### Cafeteria Manager — 김지현 (48, 위탁급식 지점장)

- 상황: 판교의 한 건물에서 7개사 1,800여 명이 이용하는 구내식당을 운영
- 고민: "내일 몇 명이 올지 몰라 항상 넉넉히 준비하고, 남으면 버린다. 월말이면 회사별 식수를 엑셀로 집계하느라 이틀을 쓴다."
- 목표: 정확한 예측으로 조리량 최적화, 정산 자동화

### Workspace Manager — 박서연 (35, A전자 총무팀)

- 상황: 자사 직원 732명의 식당 이용을 관리하고 매달 급여 차감을 처리
- 고민: "매달 휴가·출장 명단과 인원 변동을 정리해 식당에 넘기고, 정산서를 검증해 급여 차감 파일을 만드는 일이 모두 수작업이다."
- 목표: 자료 전달 업무 제거, 직원들의 식당 만족도 파악

### Employee — 이도윤 (28, A전자 기획팀)

- 상황: 주 3~4회 구내식당 이용
- 고민: "오늘 메뉴가 뭔지, 언제 가면 안 붐비는지 알고 싶고, 급여에서 얼마 차감되는지 확인하고 싶다."
- 목표: 간편한 식사 인증, 메뉴 정보와 의견 전달 채널

## 3. User Journey

### 식당 관리자

1. (전일 18:00) 시스템이 자동 생성한 익일 식수예측·메뉴 A/B 비율·권장 조리량 확인
2. (당일 10:30) 투표 마감·당일 부재 반영 보정 예측 확인 후 최종 조리량 결정
3. (점심) 실시간 태깅 현황·혼잡도 모니터링, 필요시 수기 입력
4. (오후) 잔반량·예측 정확도 확인, VOC 답변
5. (월말) 자동 집계된 회사별 정산 확인 → 확정 → 정산서·차감 파일 자동 발송

### 회사 관리자

1. (최초 1회) 그룹웨어·조직도 연동 설정, 직원 초대
2. (평상시) 개입 없음 — 부재·조직 변동이 자동 연동되는지 모니터링만
3. (월말) 확정된 정산서 확인, 급여 차감 파일 다운로드 후 급여 시스템 반영
4. (수시) 자사 직원 이용 현황·VOC 확인

### 직원

1. (오전) 앱에서 오늘 메뉴 확인, 선호 메뉴 투표 (10:30 마감)
2. (점심) 배식대에서 QR 또는 사원증 태깅 — 선택한 메뉴(A/B) 배식대 기준으로 기록
3. (식후) 별점·한줄평, 필요시 VOC 작성
4. (월말) 내 식사 기록과 급여 차감 예정액 확인

## 4. Domain Model

| Entity | 정의 | 비고 |
|---|---|---|
| **Account** | 로그인 계정. 하나의 Account는 여러 Workspace/Cafeteria에서 서로 다른 역할을 가질 수 있다. | 이메일 기반 |
| **Workspace** | 회사 (예: A전자, B솔루션). 직원과 회사관리자를 포함하며 그룹웨어·조직도 연동 설정을 가진다. | |
| **Cafeteria** | 구내식당 (예: 판교 본사 구내식당). 여러 Workspace가 공동 이용한다. | |
| **Contract** | Workspace–Cafeteria 간 계약. **운영의 기준 엔티티**. 이용시간, 식대 단가, 계약기간, 정산 방식(월 청구/급여 차감), 상태를 가진다. | v0.1 승계 |
| **Menu** | 일자·식사대별 메뉴. 항상 A/B 2종으로 운영. 메뉴명, 구성, 카테고리(국물/튀김 등), 알레르기·영양 정보. | 2택 운영이 선호도 실측의 전제 |
| **Absence** | 부재 예정. 그룹웨어 사전결재 문서에서 자동 생성. 유형(휴가/재택/외근/출장), 결재 상태(상신/승인/반려/취소), 대상일, 반일 여부. | 구 명칭 Attendance에서 변경 |
| **Meal Log** | 실제 식수 기록. QR/사원증/수기 모든 인증 방식이 Meal Log로 통합된다. 어느 메뉴(A/B) 배식대에서 태깅했는지 포함 → 선호도 실측 데이터. | 정산·예측의 원천 |
| **Prediction** | 일자·식사대별 예측 결과. 총 예상 식수, Workspace별 식수, 시간대별 혼잡, 메뉴 A/B 비율, 신뢰도, 예측 버전(18:00 기본/10:30 보정). | |
| **Settlement** | 월 단위 정산. Workspace별 식수 집계, 청구액, 상태(집계중/확정/완료), 급여 차감 파일. 조직 변경 반영 내역 포함. | |
| **Feedback** | 직원 피드백. 만족도(별점 1~5, 한줄평)와 VOC(분류: 메뉴/위생/운영/기타, 내용, 답변 상태). 익명 제출 지원. | |

## 5. Business Flow

### 그룹웨어 연동 (부재 자동 수집)

- 각 Workspace의 그룹웨어에 올라온 휴가·재택·외근·출장 **사전결재 문서**를 API/웹훅으로 수집하여 Absence를 자동 생성한다. 사람이 명단을 전달하지 않는다.
- **반영 규칙**: 결재 **승인** 문서만 예측에 반영하고, 상신 상태는 참고 지표로만 표시
- **부분 부재**: 반차·오전 외근 등은 점심시간(계약상 이용시간)과 겹치는지 판단하여 반영 여부 결정
- **변경/취소**: 결재 취소·변경 발생 시 당일 10:30 보정 예측 전까지 자동 재계산, 이후 변경은 익일 리포트에 차이로 기록

### 조직도 연동 (소속 자동 파악)

- HR/조직도 데이터를 매일 06:00 동기화하여 신규입사·퇴사·계열사 이동을 자동 감지
- **신규입사**: 계정 자동 초대 및 식사 권한 부여
- **퇴사**: 이용 권한 회수, 퇴사일까지의 Meal Log는 해당 월 정산에 포함
- **계열사 이동**: 이동일 기준으로 Meal Log의 정산 귀속 Workspace를 분리 (이동 전 기록은 이전 회사로 청구)

### 식수 인증

- 지원 방식: ① QR 체크인 ② 사원증 태깅 ③ 수기 입력(매니저 권한) — 세 방식 모두 Meal Log 생성
- 배식대를 메뉴 A/B로 구분하여 태깅 → 실제 메뉴 선택 데이터 확보
- 중복 인증(동일인 3분 내 재인증) 자동 감지, 방문자는 수기 입력 + 비용 부담 주체 지정

### 식수 예측

- 입력: 과거 식수, 요일, 메뉴(카테고리·과거 성과), 날씨, Absence(승인 기준), 행사
- 매일 18:00 익일 예측 자동 생성 → 당일 10:30 투표 마감·최신 부재 반영 보정
- 출력: 총 예상 식수, Workspace별 식수, 시간대별 혼잡도, 메뉴 A/B 준비 비율, 권장 조리량(기본 여유율 3.8%), 신뢰도

### 정산

- Meal Log → Workspace별 자동 집계 → 월말 식당관리자 확정 → 정산서·급여 차감 파일 자동 생성
- 사람의 개입은 **확정 승인**과 **예외 처리**(방문자 부담 주체 매핑, 이의 신청)로 최소화
- 정산 방식은 Contract 기준: 월 청구 또는 급여 차감

### 리포트

- 주간 운영 리포트(예측 정확도, 잔반, 만족도)와 월간 정산 리포트 자동 생성·예약 발송
- 자동화 효과 지표 포함: 자동 처리된 부재 반영·정산 집계 건수, 수작업 대비 절감 시간

## 6. Functional Specification

### 식수 예측

- FR-P1 매일 18:00 익일 예측 자동 생성, 당일 10:30 자동 보정
- FR-P2 총·회사별·시간대별 예상 식수와 신뢰도 표시
- FR-P3 예측 영향 요인(메뉴, 부재, 날씨, 요일) 기여도 표시
- FR-P4 메뉴 A/B 준비 비율과 권장 조리량 제안, What-if 메뉴 시뮬레이션
- FR-P5 수동 재계산 요청 지원

### 식수 현황

- FR-S1 실시간 태깅 집계(예상 대비 진행률), 시간대별 예상·실제 비교 차트
- FR-S2 인증 채널(QR/사원증/수기)별 현황, 실시간 Meal Log 스트림
- FR-S3 이상 로그 감지: 중복 인증, 미매핑 방문자, 비정상 속도
- FR-S4 회사별 이용 현황과 잔여 식수 전망

### 메뉴 & 선호도

- FR-M1 일자·식사대별 메뉴 A/B 등록 (구성, 카테고리, 알레르기·영양 정보)
- FR-M2 직원 앱 사전 투표 (당일 10:30 마감, 예측에 반영)
- FR-M3 **투표(사전 의향) vs 태깅(실제 선택) 비교** — 예측 보정과 선호도 실측의 핵심 데이터
- FR-M4 회사별 선호 분포, 메뉴별 식수·잔반 영향 분석

### 부재 예정

- FR-A1 그룹웨어 결재 문서 자동 수집으로 Absence 생성 (수기 등록은 예외 경로)
- FR-A2 유형별(휴가/재택/외근/출장)·회사별 집계와 식수 영향(-N식) 표시
- FR-A3 결재 상태 추적: 승인만 예측 반영, 상신은 참고 표시, 취소 시 재계산
- FR-A4 데이터 품질 체크: 종료일 누락, 급증 감지, 늦은 등록의 예측 반영 이력

### 정산 관리

- FR-T1 Meal Log 기반 회사별 자동 집계 (Contract 단가·정산 방식 적용)
- FR-T2 월 정산 확정 워크플로: 집계 → 식당관리자 확정 → 회사관리자 조회
- FR-T3 급여 차감 파일 생성·다운로드, 예외(회사 부담·행사) 제외 처리
- FR-T4 조직 변경(퇴사/이동/입사) 반영 내역 표시 — 이동일 기준 귀속 분리
- FR-T5 방문자 식수의 부담 주체 매핑, 이의 신청 처리

### 직원 의견(VOC)

- FR-V1 식후 별점(1~5)·한줄평 제출 (익명 처리)
- FR-V2 분류별(메뉴/위생/운영/기타) VOC 작성과 답변 상태 추적
- FR-V3 식당관리자 답변·반영 처리, 회사관리자는 자사 VOC 열람

### 리포트

- FR-R1 주간 운영 리포트: 예측 정확도, 잔반, 만족도, 주요 인사이트
- FR-R2 월간 정산 리포트: 회사별 청구, 차감 요약
- FR-R3 자동화 효과 지표: 자동 처리 건수, 수작업 대비 절감 시간
- FR-R4 수신자·주기 예약 발송, PDF 다운로드

## 7. Permission Model

| 기능 | Cafeteria Owner | Cafeteria Manager | Workspace Manager | Employee |
|---|:-:|:-:|:-:|:-:|
| 식당 생성·계약 관리 | O | - | - | - |
| 메뉴 등록·수기 입력·QR 관리 | O | O | - | - |
| 식수 예측·운영 대시보드 | O | O | - | - |
| 정산 확정 | O | - | - | - |
| 자사 직원·부재·정산·차감 조회 | - | - | O | - |
| 자사 VOC 열람 | - | - | O | - |
| QR 체크인·투표·내 기록·VOC 작성 | - | - | - | O |

※ 회사관리자의 등록성 업무(부재·직원 명단)는 그룹웨어·조직도 연동 자동화로 대체되며, 조회·모니터링 권한이 중심이다.

## 8. Information Architecture

### 식당관리자 Portal

대시보드 · 식수 예측 · 부재 예정 내역 · 메뉴 & 선호도 · 식사 현황 · 회사별 정산 · 리포트 · 조직 관리 · 설정

### 회사관리자 Portal

대시보드 · 직원 관리 · 부재 일정(조회) · 자사 식사 현황 · 정산 조회 · 급여 차감 내역 · 리포트 · 회사 설정

### 직원 App

홈 · QR 체크인 · 오늘 메뉴(투표) · 내 식사 기록 · 만족도 · VOC 작성 · 내 설정

## 9. MVP Scope

### 해커톤 구현 범위

- 로그인/Account, Workspace·Cafeteria·Contract 생성과 온보딩(초대)
- Meal Log: QR 체크인 + 수기 입력 + 사원증 더미 스캔
- AI 식수예측(단순 모델) + 10:30 보정, 메뉴 A/B 등록 + 앱 투표
- 회사별 정산 자동 집계와 급여 차감 파일 생성
- 3개 포털 대시보드 (식당관리자/회사관리자/직원)

### 더미 데이터 범위

- 1개 식당 · 7개사 · 직원 1,842명, 최근 3개월 Meal Log
- 그룹웨어 결재 연동은 더미 결재 데이터로 시뮬레이션, 날씨는 외부 API 캐시

### 향후 확장 계획

- 실제 그룹웨어 커넥터(더존, 네이버웍스, MS365 등)와 HR/조직도 실연동
- 급여 시스템 연동(차감 자동 반영), 저녁·조식 운영, 다중 식당(멀티 지점)
- 잔반량 측정 연동으로 폐기 절감액 실측

## 10. ERD

### Entity 정의 (주요 필드)

| Table | 주요 필드 |
|---|---|
| account | id, email, name, created_at |
| workspace | id, name, groupware_config, hr_sync_config |
| workspace_member | id, workspace_id, account_id, role, employee_no, department, joined_at, left_at |
| cafeteria | id, name, location, owner_account_id |
| contract | id, workspace_id, cafeteria_id, lunch_start, lunch_end, meal_price, settlement_type, status, start_date, end_date |
| menu | id, cafeteria_id, date, meal_type, slot(A/B), name, items, category, allergens, kcal |
| menu_vote | id, menu_id, member_id, voted_at |
| absence | id, workspace_id, member_id, type, approval_status, date, is_half_day, source_doc_id, synced_at |
| meal_log | id, contract_id, member_id(nullable: 방문자), menu_slot, auth_method, logged_at, billed_workspace_id, flag |
| prediction | id, cafeteria_id, date, meal_type, version(18:00/10:30), total, by_workspace(json), by_time(json), menu_ratio, confidence |
| settlement | id, contract_id, month, meal_count, amount, status, confirmed_at, deduction_file_url |
| feedback | id, member_id(nullable: 익명), cafeteria_id, date, kind(rating/voc), rating, category, content, answer, answer_status |

### 관계 정의

- account 1—N workspace_member N—1 workspace (한 계정이 여러 회사·역할 소속 가능)
- workspace 1—N contract N—1 cafeteria (계약이 운영 기준)
- contract 1—N meal_log, contract 1—N settlement
- workspace_member 1—N absence, 1—N meal_log, 1—N menu_vote, 1—N feedback
- cafeteria 1—N menu, 1—N prediction

## 11. API Draft

| Method | Path | 설명 |
|---|---|---|
| POST | /auth/login | 로그인 (역할·소속 컨텍스트 반환) |
| GET/POST | /cafeterias, /workspaces, /contracts | 온보딩: 식당·회사·계약 생성/조회 |
| GET/POST | /cafeterias/{id}/menus | 일자별 메뉴 A/B 등록·조회 |
| POST | /menus/{id}/votes | 직원 메뉴 투표 |
| POST | /integrations/groupware/webhook | 그룹웨어 결재 문서 수신 → Absence 생성/갱신 |
| POST | /integrations/hr/sync | 조직도 동기화 (입사/퇴사/이동 반영) |
| GET | /cafeterias/{id}/absences?date= | 부재 집계 조회 (유형·회사별) |
| POST | /meal-logs | 식수 인증 (QR/사원증/수기, 메뉴 슬롯 포함) |
| GET | /cafeterias/{id}/meal-status?date= | 실시간 식사 현황 |
| GET/POST | /cafeterias/{id}/predictions | 예측 조회 / 재계산 요청 |
| GET/PATCH | /settlements?month= | 정산 집계 조회 / 확정 |
| GET | /settlements/{id}/deduction-file | 급여 차감 파일 다운로드 |
| GET/POST | /feedbacks | 만족도·VOC 제출/조회/답변 |
| GET | /reports?type=weekly\|monthly | 리포트 조회·다운로드 |

## 12. UI Specification

상세 레이아웃은 프로토타입(cafeteria-saas-ui) 참조. 역할 전환(식당관리자/회사관리자/사용자) 구조.

### Dashboard (식당관리자)

- KPI: 오늘 예상 식수, 실시간 식사 인원(도넛), 폐기 예상, 이번 달 절감 금액, 결산 진행률
- 패널: 오늘 부재 예정 인원, 회사별 예상 이용, 오늘 메뉴 & 선호도, 실시간 식사 현황 차트, 공지·VOC·정산 요약

### Prediction

- 내일 총 예상 식수(대형 숫자) + 신뢰도·피크 시간·예상 잔반, 예측 영향 요인 목록
- 메뉴 A/B 준비 비율(도넛)과 근거, 시간대별 예측 막대, 회사별 예측 표, What-if 시뮬레이션, 운영 액션 큐

### Meal Status

- 실시간 이용률 도넛·혼잡도·인증 성공률 KPI, 예상 vs 실제 라인 차트
- 인증 채널 현황, 회사별 진행률 표, 실시간 Meal Log, 확인 필요 로그(중복·방문자)

### Menu & Preference

- 오늘 메뉴 A/B 카드, 투표 참여·선호도 KPI, 회사별 선호 분포 막대
- 투표 vs 실제 태깅 비교, 메뉴별 식수예측 영향 표, 메뉴 VOC

### Absence (부재 예정)

- 유형별 KPI(휴가/재택/외근/출장)와 식수 영향, 회사별 부재 표
- 그룹웨어 연동 상태·결재 상태 표시, 주간 추이, 데이터 품질 체크

### Settlement

- 청구 예정액·정산 진행률 KPI, 회사별 월 정산 표(식수·단가·청구액·방식·상태)
- 계약/정산 기준, 급여 차감 파일 생성, 조직 변경 반영 내역, 확인 필요 항목·액션 큐

### Feedback

- 직원 App: 별점 입력, 한줄평, VOC 작성(분류·익명), 내 VOC 답변 상태
- 관리자: 만족도 통계, VOC 목록·답변, 회사관리자 자사 VOC 열람

## 13. Tech Stack

| 구분 | 기술 | 비고 |
|---|---|---|
| Frontend | Next.js + TailwindCSS | 정적 프로토타입(HTML/CSS/JS)에서 이관, 3개 포털 |
| Backend | FastAPI (Python) | REST API, 그룹웨어 웹훅 수신 |
| Database | PostgreSQL (Supabase) | 인증·스토리지 겸용 |
| AI | Python (LightGBM/scikit-learn 회귀 + 규칙 보정) | 18:00 배치 + 10:30 보정 잡 |
| Deployment | Vercel (FE) · Render (BE) · Supabase (DB) | 해커톤 기준 무료 티어 |
