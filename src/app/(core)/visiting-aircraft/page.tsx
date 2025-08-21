import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Fuel,
  Clock,
  MapPin,
  Plane,
  Radio,
  Shield,
  Navigation,
  AlertTriangle,
  Info,
  Phone,
  Mail,
  ExternalLink,
  Compass,
  Mountain,
  Building,
} from "lucide-react";
import Link from "next/link";

const fuelInfo = {
  availability: "Jet A1 and AVGAS available",
  hours: {
    weekdays: "Monday to Friday: 05h00Z - 15h00Z",
    weekends: "Saturday & Sunday: 05h30Z - 15h00Z",
    holidays: "Public Holidays: 05h30Z - 15h00Z",
    closed: "Closed on Christmas Day & 1 January",
  },
  afterHours: "After hours call out fee: R500 incl VAT",
};

const towerTimes = {
  monday: "Monday: 05:30-10:30 | 12:30-16:00",
  tuesdayFriday: "Tue- Fri: 05:30-10:30 | 11:30-16:00",
  saturday: "Saturday: 07:00-11:00",
  sunday: "Sunday: 13:00-16:00",
  note: "All times in Z",
  holidays: "Public Holidays by NOTAM",
  notams: "NOTAMS available from file2fly",
};

const airportInfo = {
  elevation: "2,423 ft / 739 m",
  runway: "RWY: 16/34 1,537m Asphalt",
  coordinates: "GPS: 29°38′48″S 30°23′54″E",
  frequencies: {
    tower: "Pietermaritzburg TWR: 122.0",
    approach: "Durban APPR: 125.75",
  },
  runwayNote:
    "NOTE: Runway 34 slopes down significantly, then up again, and then a gentle down-slope to Runway 16.",
  navigation: {
    vor: "VOR - PMV 117.9",
    ndbs: ["NDBs - OBI 280", "PU 407", "PZ 257", "ORI 442.5"],
  },
  contact: {
    tower: "(033) 386 8554",
    briefings: "(0860) 359 669",
    durbanMet: "(032) 436 3813",
  },
};

const localAirspace = {
  description:
    "Pietermaritzburg Airport 122.0 (which used to be called 'Oribi Airport') is in a CTR, and is surrounded by the Durban Special Rules Area, with the frequency 124.2",
  ctrBoundary: "CTR boundary extends up to 6500 ft",
  heightLimits: {
    south:
      "Southern side: limited to 4000ft (Thornville, Hopewell Dam, Camperdown, Table Mountain with Nagel Dam)",
    north:
      "Northern side: limited to 5000ft for VFR routings (Edendale Ridge, Hilton Ridge, Worldsview Mast, Midmar Dam, Northdale Ridge, Albert Falls Dam)",
  },
  note: "The height of the top of this Special Rules Area varies with the rising ground from the coast. There are also Special Routes in the area. Please check it out in your AIP's Enroute Section 2.2.",
};

const localAgreements = {
  gnssApproach:
    "There is a GNSS Approach from the North onto Runway 16. This approach includes part of the Durban Special Rules Area below 7500ft.",
  vfrRouting:
    "Because of light aircraft flying in the area within 2nm of Airlink, which serves the route between Pietermaritzburg and Johannesburg, all VFR pilots who contact Tower when at, abeam or south of Midmar Dam, have been asked to route either via the Edendale Ridge, or the Northdale Ridge, in the interest of safety and to remove the risk of a possible mid-air collision or incident.",
  gaGate: {
    description:
      "There is a GA Gate behind which light aircraft are most welcome to park, and come and pop in for a cuppa at the Club. This enables you to avoid the hassle of formal airport security.",
    weekdays:
      "During the week, the Tower is unable to open this gate, but on weekends they may do so, when they are open.",
    contact:
      "Please rather contact us if you would like to park our side. We can arrange to open the gate on your arrival.",
  },
};

const reportingPoints = [
  "Thornville",
  "Hopewell Dam",
  "Camperdown",
  "Table Mountain",
  "Nagel Dam",
  "Edendale Ridge",
  "Hilton Ridge",
  "Worldsview Mast",
  "Midmar Dam",
  "Northdale Ridge",
  "Albert Falls Dam",
];

export default function VisitingAircraftPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-[#262626] text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold">
              Visiting Aircraft
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
              Welcome to Pietermaritzburg Aero Club! Essential information for
              visiting pilots including fuel, tower times, airport details, and
              local procedures.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="bg-[#f6d57f] text-[#262626] hover:bg-[#f4d06a]"
              >
                <Link href="#fuel">Fuel Information</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-white text-white hover:bg-white hover:text-[#262626]"
              >
                <Link href="#airport">Airport Details</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Fuel Information */}
      <section id="fuel" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#262626] mb-6">
              Fuel Information
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Jet A1 and AVGAS available with specific operating hours and
              after-hours procedures.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#f6d57f] text-[#262626] mb-4">
                  <Fuel className="h-10 w-10" />
                </div>
                <CardTitle className="text-2xl text-[#262626]">
                  Fuel Availability
                </CardTitle>
                <CardDescription className="text-gray-600 text-lg">
                  {fuelInfo.availability}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Weekdays:</span>
                    <span className="font-medium">
                      {fuelInfo.hours.weekdays}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Weekends:</span>
                    <span className="font-medium">
                      {fuelInfo.hours.weekends}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Public Holidays:</span>
                    <span className="font-medium">
                      {fuelInfo.hours.holidays}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <span className="text-red-600">Closed:</span>
                    <span className="font-medium text-red-600">
                      {fuelInfo.hours.closed}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#262626] text-white mb-4">
                  <AlertTriangle className="h-10 w-10" />
                </div>
                <CardTitle className="text-2xl text-[#262626]">
                  After Hours Service
                </CardTitle>
                <CardDescription className="text-gray-600 text-lg">
                  Emergency fuel service available outside normal hours
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <p className="text-yellow-800 text-lg font-semibold">
                    {fuelInfo.afterHours}
                  </p>
                  <p className="text-yellow-700 text-sm mt-2">
                    Contact the club for after-hours arrangements
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tower Times */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#262626] mb-6">
              Tower Operating Hours
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Current tower operating times and NOTAM information for flight
              planning.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#f6d57f] text-[#262626] mb-4">
                  <Clock className="h-10 w-10" />
                </div>
                <CardTitle className="text-2xl text-[#262626]">
                  Tower Schedule
                </CardTitle>
                <CardDescription className="text-gray-600 text-lg">
                  All times are in Zulu (UTC)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Monday</h4>
                    <p className="text-blue-700">{towerTimes.monday}</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">
                      Tuesday - Friday
                    </h4>
                    <p className="text-green-700">{towerTimes.tuesdayFriday}</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">
                      Saturday
                    </h4>
                    <p className="text-purple-700">{towerTimes.saturday}</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">
                      Sunday
                    </h4>
                    <p className="text-orange-700">{towerTimes.sunday}</p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">
                      <strong>Note:</strong> {towerTimes.note}
                    </p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-yellow-800">
                      <strong>Public Holidays:</strong> {towerTimes.holidays}
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-800">
                      <strong>NOTAMs:</strong> {towerTimes.notams}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Airport Information */}
      <section id="airport" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#262626] mb-6">
              Pietermaritzburg Airport Details
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Essential airport information including runway details,
              frequencies, and navigation aids.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#f6d57f] text-[#262626]">
                    <MapPin className="h-8 w-8" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-[#262626]">
                      Airport Specifications
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Elevation:</span>
                    <span className="font-medium">{airportInfo.elevation}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Runway:</span>
                    <span className="font-medium">{airportInfo.runway}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Coordinates:</span>
                    <span className="font-medium">
                      {airportInfo.coordinates}
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800 text-sm">
                    <strong>Important:</strong> {airportInfo.runwayNote}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#f6d57f] text-[#262626]">
                    <Radio className="h-8 w-8" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-[#262626]">
                      Frequencies & Navigation
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">
                      Radio Frequencies
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-blue-700">Tower:</span>
                        <span className="font-medium">
                          {airportInfo.frequencies.tower}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Approach:</span>
                        <span className="font-medium">
                          {airportInfo.frequencies.approach}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">
                      Navigation Aids
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-green-700">VOR:</span>
                        <span className="font-medium">
                          {airportInfo.navigation.vor}
                        </span>
                      </div>
                      <div>
                        <span className="text-green-700">NDBs:</span>
                        <div className="mt-1 space-y-1">
                          {airportInfo.navigation.ndbs.map((ndb, index) => (
                            <div
                              key={index}
                              className="text-sm font-medium ml-4"
                            >
                              {ndb}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="mt-12">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#262626] text-white mb-4">
                  <Phone className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl text-[#262626]">
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-[#262626] mb-2">Tower</h4>
                    <p className="text-gray-600">{airportInfo.contact.tower}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-[#262626] mb-2">
                      Briefings
                    </h4>
                    <p className="text-gray-600">
                      {airportInfo.contact.briefings}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-[#262626] mb-2">
                      Durban MET Office
                    </h4>
                    <p className="text-gray-600">
                      {airportInfo.contact.durbanMet}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Local Airspace */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#262626] mb-6">
              Local Airspace & Procedures
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Important information about CTR boundaries, height limits, and
              special routing procedures.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#f6d57f] text-[#262626]">
                    <Navigation className="h-8 w-8" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-[#262626]">
                      Airspace Structure
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  {localAirspace.description}
                </p>

                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">
                      CTR Boundary
                    </h4>
                    <p className="text-blue-700">{localAirspace.ctrBoundary}</p>
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">
                      Height Limits
                    </h4>
                    <div className="space-y-2">
                      <div>
                        <span className="text-green-700 font-medium">
                          South:
                        </span>
                        <p className="text-green-700 text-sm ml-2">
                          {localAirspace.heightLimits.south}
                        </p>
                      </div>
                      <div>
                        <span className="text-green-700 font-medium">
                          North:
                        </span>
                        <p className="text-green-700 text-sm ml-2">
                          {localAirspace.heightLimits.north}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800 text-sm">
                    <strong>Note:</strong> {localAirspace.note}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#f6d57f] text-[#262626]">
                    <Shield className="h-8 w-8" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-[#262626]">
                      Local Agreements & Procedures
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">
                      GNSS Approach
                    </h4>
                    <p className="text-blue-700 text-sm">
                      {localAgreements.gnssApproach}
                    </p>
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">
                      VFR Routing
                    </h4>
                    <p className="text-green-700 text-sm">
                      {localAgreements.vfrRouting}
                    </p>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">
                      GA Gate
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p className="text-purple-700">
                        {localAgreements.gaGate.description}
                      </p>
                      <p className="text-purple-700">
                        {localAgreements.gaGate.weekdays}
                      </p>
                      <p className="text-purple-700 font-medium">
                        {localAgreements.gaGate.contact}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Reporting Points */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#262626] mb-6">
              Local Reporting Points
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key landmarks and reporting points for navigation in the
              Pietermaritzburg area.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#f6d57f] text-[#262626] mb-4">
                  <Compass className="h-10 w-10" />
                </div>
                <CardTitle className="text-2xl text-[#262626]">
                  Navigation Landmarks
                </CardTitle>
                <CardDescription className="text-gray-600 text-lg">
                  Use these points for position reporting and navigation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {reportingPoints.map((point, index) => (
                    <div
                      key={index}
                      className="p-3 bg-gray-50 rounded-lg text-center"
                    >
                      <span className="text-[#262626] font-medium">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#f6d57f] text-[#262626] mb-6">
              <Plane className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold text-[#262626] mb-4">
              Planning a Visit?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Contact us in advance to arrange GA gate access and ensure a
              smooth arrival. We're happy to assist with any questions about
              visiting procedures.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="bg-[#f6d57f] text-[#262626] hover:bg-[#f4d06a]"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-[#262626] text-[#262626] hover:bg-[#262626] hover:text-white"
              >
                <Link href="/pilot-resources">Pilot Resources</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
