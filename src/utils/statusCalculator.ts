import { HealthCenter, OperationalStatusResult, StatusSimulationMode } from '../types';

/**
 * Returns current date and time in Philippine Standard Time (UTC+8)
 */
export function getManilaDate(): Date {
  const now = new Date();
  // Compute Manila time (UTC + 8 hours)
  const utcOffset = now.getTime() + now.getTimezoneOffset() * 60000;
  const manilaOffset = 8 * 60 * 60000;
  return new Date(utcOffset + manilaOffset);
}

export function formatManilaTime(date: Date): { timeString: string; dateString: string } {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const pad = (n: number) => n.toString().padStart(2, '0');

  const timeString = `${displayHours}:${pad(minutes)}:${pad(seconds)} ${ampm} PHT`;

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dateString = `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

  return { timeString, dateString };
}

export function computeCenterOperationalStatus(
  center: HealthCenter,
  simulationMode: StatusSimulationMode = 'realtime'
): OperationalStatusResult {
  if (simulationMode === 'force_open') {
    return {
      status: 'open',
      statusText: 'Open Now',
      statusTextTl: 'Bukas Ngayon',
      subText: 'Regular Consultation & Walk-ins Active',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      dotColor: 'bg-emerald-500',
      isOpen: true,
      nextChangeText: 'Closes at 5:00 PM PHT (Simulation)',
    };
  }

  if (simulationMode === 'force_lunch') {
    return {
      status: 'lunch_break',
      statusText: 'Lunch Break',
      statusTextTl: 'Tanghalian',
      subText: 'Emergency Triage & Urgent Inquiries Only',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
      dotColor: 'bg-amber-500',
      isOpen: false,
      nextChangeText: 'Resumes consultation at 1:00 PM PHT',
    };
  }

  if (simulationMode === 'force_closed') {
    return {
      status: 'closed',
      statusText: 'Closed',
      statusTextTl: 'Sarado',
      subText: 'Scheduled services resume next business day',
      badgeColor: 'bg-slate-100 text-slate-700 border-slate-300',
      dotColor: 'bg-slate-400',
      isOpen: false,
      nextChangeText: 'Reopens at 8:00 AM PHT (Simulation)',
    };
  }

  const manila = getManilaDate();
  const dayOfWeek = manila.getDay(); // 0 = Sun, 1 = Mon ... 6 = Sat
  const hour = manila.getHours();
  const minute = manila.getMinutes();
  const currentMinutes = hour * 60 + minute;

  // Sunday
  if (dayOfWeek === 0) {
    return {
      status: 'closed',
      statusText: 'Closed Today',
      statusTextTl: 'Sarado Ngayong Linggo',
      subText: 'Sunday Rest Day • For emergencies call 911 or (02) 8641-7890',
      badgeColor: 'bg-slate-100 text-slate-700 border-slate-300',
      dotColor: 'bg-slate-400',
      isOpen: false,
      nextChangeText: 'Reopens Monday at 8:00 AM PHT',
    };
  }

  // Saturday
  if (dayOfWeek === 6) {
    // Saturday hours: e.g. Sto. Rosario, Aguho, Santa Ana have Saturday desk (8am - 12pm)
    const hasSatHours = center.operatingHours.saturday.includes('8:00 AM');
    if (hasSatHours) {
      if (currentMinutes >= 8 * 60 && currentMinutes < 12 * 60) {
        const remainingMinutes = 12 * 60 - currentMinutes;
        const remH = Math.floor(remainingMinutes / 60);
        const remM = remainingMinutes % 60;
        return {
          status: 'open',
          statusText: 'Open (Saturday Hours)',
          statusTextTl: 'Bukas (Iskedyul sa Sabado)',
          subText: 'Urgent consultation & basic triage desk',
          badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          dotColor: 'bg-emerald-500',
          isOpen: true,
          nextChangeText: `Closes at 12:00 PM (in ${remH > 0 ? `${remH}h ` : ''}${remM}m)`,
        };
      }
    }

    return {
      status: 'closed',
      statusText: 'Closed (Weekend)',
      statusTextTl: 'Sarado (Weekend)',
      subText: 'Regular operations resume on Monday at 8:00 AM',
      badgeColor: 'bg-slate-100 text-slate-700 border-slate-300',
      dotColor: 'bg-slate-400',
      isOpen: false,
      nextChangeText: 'Reopens Monday at 8:00 AM PHT',
    };
  }

  // Monday to Friday
  const openTime = 8 * 60; // 08:00
  const lunchStart = 12 * 60; // 12:00
  const lunchEnd = 13 * 60; // 13:00
  const closeTime = 17 * 60; // 17:00

  // Before 8:00 AM
  if (currentMinutes < openTime) {
    const diff = openTime - currentMinutes;
    const remH = Math.floor(diff / 60);
    const remM = diff % 60;
    return {
      status: 'closed',
      statusText: 'Closed • Opens at 8:00 AM',
      statusTextTl: 'Sarado • Magbubukas sa 8:00 AM',
      subText: 'Queue number distribution begins at 7:30 AM',
      badgeColor: 'bg-slate-100 text-slate-700 border-slate-300',
      dotColor: 'bg-slate-400',
      isOpen: false,
      nextChangeText: `Opens in ${remH > 0 ? `${remH}h ` : ''}${remM}m`,
    };
  }

  // Morning Shift (8:00 AM – 12:00 PM)
  if (currentMinutes >= openTime && currentMinutes < lunchStart) {
    const diff = lunchStart - currentMinutes;
    const remH = Math.floor(diff / 60);
    const remM = diff % 60;
    return {
      status: 'open',
      statusText: 'Open Now',
      statusTextTl: 'Bukas Ngayon',
      subText: 'Morning Consultations, Immunizations & Triage Active',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      dotColor: 'bg-emerald-500',
      isOpen: true,
      nextChangeText: `Lunch break begins at 12:00 PM (in ${remH > 0 ? `${remH}h ` : ''}${remM}m)`,
    };
  }

  // Lunch Break (12:00 PM – 1:00 PM)
  if (currentMinutes >= lunchStart && currentMinutes < lunchEnd) {
    const diff = lunchEnd - currentMinutes;
    return {
      status: 'lunch_break',
      statusText: 'Lunch Break',
      statusTextTl: 'Oras ng Tanghalian',
      subText: 'Staff lunch hour • Emergency triage desk remains on standby',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
      dotColor: 'bg-amber-500',
      isOpen: false,
      nextChangeText: `Afternoon consultations resume in ${diff}m`,
    };
  }

  // Afternoon Shift (1:00 PM – 5:00 PM)
  if (currentMinutes >= lunchEnd && currentMinutes < closeTime) {
    const diff = closeTime - currentMinutes;
    const remH = Math.floor(diff / 60);
    const remM = diff % 60;
    return {
      status: 'open',
      statusText: 'Open Now',
      statusTextTl: 'Bukas Ngayon',
      subText: 'Afternoon Consultations, Senior Care & Medicine Refill',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      dotColor: 'bg-emerald-500',
      isOpen: true,
      nextChangeText: `Closes at 5:00 PM (in ${remH > 0 ? `${remH}h ` : ''}${remM}m)`,
    };
  }

  // After 5:00 PM
  return {
    status: 'closed',
    statusText: 'Closed for the Day',
    statusTextTl: 'Sarado na Ngayong Araw',
    subText: 'Consultations ended at 5:00 PM • For emergencies call 911 or (02) 8641-7890',
    badgeColor: 'bg-slate-100 text-slate-700 border-slate-300',
    dotColor: 'bg-slate-400',
    isOpen: false,
    nextChangeText: dayOfWeek === 5 ? 'Reopens Monday at 8:00 AM PHT' : 'Reopens tomorrow at 8:00 AM PHT',
  };
}
